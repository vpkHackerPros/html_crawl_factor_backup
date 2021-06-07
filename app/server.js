const express = require('express')
const bodyParser = require('body-parser')
const net = require('net')
const fs = require('fs')
const parse = require('csv-parse/lib/sync')
const path = require('path')
const MongoClient = require('mongodb').MongoClient;
const fetch = require('node-fetch')
const nodeCmd = require('node-cmd');

const MidiIP = 'GRAFIKA4'
const nvgIP = 'VIZ01'
const nvgPort = 6100
const AudioIP ='DESKTOP-DVISHFI:5000'
const url = 'mongodb://127.0.0.1:27017'
const dbName = 'piramida'
const pathCaspar = 'PIRAMIDACASPAR:80'

const sendMidi = (number) => {
  fetch(`http://${MidiIP}:3000/midi/${number}`)
  console.log('midi: ' + number)
}

class Lights {
  static holeSelect (number) {
    sendMidi(Number(number) + 80)
    console.log(`setting hole ${number}`)
  }
  static holeSelectRed (number) {
    sendMidi(Number(number) + 70)
    console.log(`setting hole ${number}`)
  }
  static bracketsWhite (id) {
    sendMidi(id)
  }
  static bracketsRed (id) {
    sendMidi(Number(id) + 20)
  }
  static bracketsGreen (id) {
    sendMidi(Number(id) + 40)
  }
  static clearBrackets () {
    sendMidi(54)
  }
  static right () {
    sendMidi(100)
  }
  static wrong () {
    sendMidi(101)
  }
  static topic () {
    sendMidi(99)
  }
  static FirstRound () {
    sendMidi(103)
  }
}
class VizCoreCommands {
  static setScene         = (project, scene)  => `0 RENDERER SET_OBJECT SCENE*${project}/${scene}\0`
  static setTextBasic     = (container, text) => `0 RENDERER*TREE*$${container}*GEOM*TEXT SET ${text}\0`
  static setTextPlugin    = (container, text) => `0 RENDERER*TREE*$${container}*FUNCTION*TFxWrite*Text SET ${text}\0`
  static animationStart   = (animationName)   => `0 RENDERER*STAGE*DIRECTOR*$${animationName} START\0`
  static animationToStart = (animationName)   => `0 RENDERER*STAGE*DIRECTOR*$${animationName} SHOW START\0`
  static animationToEnd   = (animationName)   => `0 RENDERER*STAGE*DIRECTOR*$${animationName} SHOW END\0`
  static setActive        = (container)       => `0 RENDERER*TREE*$${container}*GEOM*ACTIVE SET 1\0`
  static setNonActive     = (container)       => `0 RENDERER*TREE*$${container}*GEOM*ACTIVE SET 0\0`
}
const getAnswersWithPriority = (priorityString, count) => {
  let outArr
  console.log(priorityString)
  try {
    outArr = priorityString.slice(0, count).split('').sort()
    console.log(outArr)
  } catch {
    outArr = ['a', 'b', 'c', 'd']
    console.log('answer priority is default')
  }
  return outArr
}

let questionGfxCounter = 0
class Commands {
  static denar (value) {
    return VizCoreCommands.setScene('KVIZ_PIRAMIDA', 'PLAYOUT/DENAR_CENTER') + VizCoreCommands.setTextBasic('ZNESEK', value) + VizCoreCommands.animationStart('DENAR_CENTER_IN')
  }
  static denarOUT (value) {
    return VizCoreCommands.setScene('KVIZ_PIRAMIDA', 'PLAYOUT/DENAR_CENTER') + VizCoreCommands.animationToStart('DENAR_CENTER_IN') +  VizCoreCommands.animationStart('DENAR_CENTER_OUT')
  }
  static podpis (podpisa) {
    return VizCoreCommands.setScene('KVIZ_PIRAMIDA', 'PLAYOUT/PODPIS_GOSTOV') +
      VizCoreCommands.setTextBasic('PODPIS_1', podpisa[0]) +
      VizCoreCommands.setTextBasic('PODPIS_2', podpisa[1]) +
      VizCoreCommands.animationStart('PODPIS_GOSTA_IN')
  }


// VPRASANJA VIZ copy-paste fuckary
  static questionIn2Ans () {
    return VizCoreCommands.setScene('KVIZ_PIRAMIDA', 'PLAYOUT/VPRASANJE_1_KROG') +
      VizCoreCommands.animationStart('VPRASANJE_1_KROG_IN')  +
      VizCoreCommands.animationToStart('VPRASANJE_1_KROG_OUT')
  }
  static questionOut2Ans () {
    questionGfxCounter = 0
    return VizCoreCommands.setScene('KVIZ_PIRAMIDA', 'PLAYOUT/VPRASANJE_1_KROG') +
      VizCoreCommands.animationToStart('ZELENA_IN') +
      VizCoreCommands.animationToStart('RDECA_IN') +
      VizCoreCommands.animationToStart('ODGOVOR_A_IN') +
      VizCoreCommands.animationToStart('ODGOVOR_B_IN') +
      VizCoreCommands.animationToStart('ODGOVOR_C_IN') +
      VizCoreCommands.animationToStart('ODGOVOR_D_IN') +
      VizCoreCommands.animationToStart('TXT_ODGOVOR_A_1_KROG_IN') +
      VizCoreCommands.animationToStart('TXT_ODGOVOR_B_1_KROG_IN') +
      VizCoreCommands.animationToStart('TXT_ODGOVOR_C_1_KROG_IN') +
      VizCoreCommands.animationToStart('TXT_ODGOVOR_D_1_KROG_IN') +
      VizCoreCommands.animationToStart('TXT_VPRASANJE_1_KROG_IN') +
      VizCoreCommands.animationStart('VPRASANJE_1_KROG_OUT')
  }
  static questionNext2Ans () {
    let string = ''
    console.log(currentQuestion)
    switch (questionGfxCounter) {
      case 0: string = VizCoreCommands.setTextBasic('ODGOVOR_1', currentQuestion[0][answerPriority2[0]]) + VizCoreCommands.setTextBasic('ODGOVOR_1_BARVA', currentQuestion[0][answerPriority2[0]]) + VizCoreCommands.animationStart('TXT_ODGOVOR_A_1_KROG_IN')
        break;
      case 1: string = VizCoreCommands.setTextBasic('ODGOVOR_2', currentQuestion[0][answerPriority2[1]]) + VizCoreCommands.setTextBasic('ODGOVOR_2_BARVA', currentQuestion[0][answerPriority2[1]]) + VizCoreCommands.animationStart('TXT_ODGOVOR_B_1_KROG_IN')
        break;
      case 2: string = VizCoreCommands.setTextBasic('TXT_VPRASANJE', currentQuestion[0].vprasanje) + VizCoreCommands.animationStart('TXT_VPRASANJE_1_KROG_IN')
        break;
      default: console.log('out of limits')
    }
    questionGfxCounter ++
    return string
  }
  static maskaIN () {
    return VizCoreCommands.animationStart('MASKA_IN')
  }
  static maskaOUT () {
    return VizCoreCommands.animationStart('MASKA_OUT')
  }
  static questionTempOut1 () {
    return VizCoreCommands.setScene('KVIZ_PIRAMIDA', 'PLAYOUT/VPRASANJE_1_KROG') +
    VizCoreCommands.animationStart('VSE_1_KROG_OUT')
  }
  static questionTempIn1 () {
    return VizCoreCommands.setScene('KVIZ_PIRAMIDA', 'PLAYOUT/VPRASANJE_1_KROG') +
    VizCoreCommands.animationStart('VSE_1_KROG_IN')
  }

  static questionIn3Ans () {
    return VizCoreCommands.setScene('KVIZ_PIRAMIDA', 'PLAYOUT/VPRASANJE_2_KROG') +
      VizCoreCommands.animationToStart('VPRASANJE_2_KROG_OUT')
      VizCoreCommands.animationStart('VPRASANJE_2_KROG_IN')
  }
  static questionOut3Ans () {
    questionGfxCounter = 0
    return VizCoreCommands.setScene('KVIZ_PIRAMIDA', 'PLAYOUT/VPRASANJE_2_KROG') +
      VizCoreCommands.animationToStart('ZELENA_IN') +
      VizCoreCommands.animationToStart('RDECA_IN') +
      VizCoreCommands.animationToStart('ODGOVOR_A_IN') +
      VizCoreCommands.animationToStart('ODGOVOR_B_IN') +
      VizCoreCommands.animationToStart('ODGOVOR_C_IN') +
      VizCoreCommands.animationToStart('ODGOVOR_D_IN') +
      VizCoreCommands.animationToStart('TXT_ODGOVOR_A_2_KROG_IN') +
      VizCoreCommands.animationToStart('TXT_ODGOVOR_B_2_KROG_IN') +
      VizCoreCommands.animationToStart('TXT_ODGOVOR_C_2_KROG_IN') +
      VizCoreCommands.animationToStart('TXT_ODGOVOR_D_2_KROG_IN') +
      VizCoreCommands.animationToStart('TXT_VPRASANJE_2_KROG_IN') +
      VizCoreCommands.animationStart('VPRASANJE_2_KROG_OUT')
  }
  static questionNext3Ans () {
    let string = ''
    console.log(currentQuestion)
    switch (questionGfxCounter) {
      case 0: string = VizCoreCommands.setTextBasic('ODGOVOR_1', currentQuestion[0][answerPriority3[0]]) + VizCoreCommands.setTextBasic('ODGOVOR_1_BARVA', currentQuestion[0][answerPriority3[0]]) +VizCoreCommands.animationStart('TXT_ODGOVOR_A_2_KROG_IN')
        break;
      case 1: string = VizCoreCommands.setTextBasic('ODGOVOR_2', currentQuestion[0][answerPriority3[1]]) + VizCoreCommands.setTextBasic('ODGOVOR_2_BARVA', currentQuestion[0][answerPriority3[1]]) +VizCoreCommands.animationStart('TXT_ODGOVOR_B_2_KROG_IN')
        break;
      case 2: string = VizCoreCommands.setTextBasic('ODGOVOR_3', currentQuestion[0][answerPriority3[2]]) + VizCoreCommands.setTextBasic('ODGOVOR_3_BARVA', currentQuestion[0][answerPriority3[2]]) +VizCoreCommands.animationStart('TXT_ODGOVOR_C_2_KROG_IN')
        break;
      case 3: string = VizCoreCommands.setTextBasic('TXT_VPRASANJE', currentQuestion[0].vprasanje) + VizCoreCommands.animationStart('TXT_VPRASANJE_2_KROG_IN')
        break;
      default: console.log('out of limits')
    }
    questionGfxCounter ++
    return string
  }
  static questionIn4Ans () {
    return VizCoreCommands.setScene('KVIZ_PIRAMIDA', 'PLAYOUT/VPRASANJE_3_KROG') +
      VizCoreCommands.animationToStart('VPRASANJE_3_KROG_OUT') +
      VizCoreCommands.animationStart('VPRASANJE_3_KROG_IN')
  }
  static questionOut4Ans () {
    questionGfxCounter = 0
    return VizCoreCommands.setScene('KVIZ_PIRAMIDA', 'PLAYOUT/VPRASANJE_3_KROG') +
      VizCoreCommands.animationToStart('ZELENA_IN') +
      VizCoreCommands.animationToStart('RDECA_IN') +
      VizCoreCommands.animationToStart('ODGOVOR_A_IN') +
      VizCoreCommands.animationToStart('ODGOVOR_B_IN') +
      VizCoreCommands.animationToStart('ODGOVOR_C_IN') +
      VizCoreCommands.animationToStart('ODGOVOR_D_IN') +
      VizCoreCommands.animationToStart('TXT_ODGOVOR_A_3_KROG_IN') +
      VizCoreCommands.animationToStart('TXT_ODGOVOR_B_3_KROG_IN') +
      VizCoreCommands.animationToStart('TXT_ODGOVOR_C_3_KROG_IN') +
      VizCoreCommands.animationToStart('TXT_ODGOVOR_D_3_KROG_IN') +
      VizCoreCommands.animationToStart('TXT_VPRASANJE_3_KROG_IN') +
      VizCoreCommands.animationStart('VPRASANJE_3_KROG_OUT')
  }
  static questionNext4Ans () {
    let string = ''
    console.log(currentQuestion)
    switch (questionGfxCounter) {
      case 0: string = VizCoreCommands.setTextBasic('ODGOVOR_1', currentQuestion[0][answerPriority4[0]]) + VizCoreCommands.setTextBasic('ODGOVOR_1_BARVA', currentQuestion[0][answerPriority4[0]]) +VizCoreCommands.animationStart('TXT_ODGOVOR_A_3_KROG_IN')
        break;
      case 1: string = VizCoreCommands.setTextBasic('ODGOVOR_2', currentQuestion[0][answerPriority4[1]]) + VizCoreCommands.setTextBasic('ODGOVOR_2_BARVA', currentQuestion[0][answerPriority4[1]]) +VizCoreCommands.animationStart('TXT_ODGOVOR_B_3_KROG_IN')
        break;
      case 2: string = VizCoreCommands.setTextBasic('ODGOVOR_3', currentQuestion[0][answerPriority4[2]]) + VizCoreCommands.setTextBasic('ODGOVOR_3_BARVA', currentQuestion[0][answerPriority4[2]]) +VizCoreCommands.animationStart('TXT_ODGOVOR_C_3_KROG_IN')
        break;
      case 3: string = VizCoreCommands.setTextBasic('ODGOVOR_4', currentQuestion[0][answerPriority4[3]]) + VizCoreCommands.setTextBasic('ODGOVOR_4_BARVA', currentQuestion[0][answerPriority4[3]]) +VizCoreCommands.animationStart('TXT_ODGOVOR_D_3_KROG_IN')
        break;
      case 4: string = VizCoreCommands.setTextBasic('TXT_VPRASANJE', currentQuestion[0].vprasanje) + VizCoreCommands.animationStart('TXT_VPRASANJE_3_KROG_IN')
        break;
      default: console.log('out of limits')
    }
    questionGfxCounter ++
    return string
  }
  static CorrectAns () {
    return VizCoreCommands.animationStart('ZELENA_IN')
  }
  static WrongAns () {
    return VizCoreCommands.animationStart('RDECA_IN')
  }
  static chooseAnswer (id) {    let string = ''
    switch (id) {
      case '1': string = VizCoreCommands.animationStart('ODGOVOR_A_IN')
        break
      case '2': string = VizCoreCommands.animationStart('ODGOVOR_B_IN')
        break
      case '3': string = VizCoreCommands.animationStart('ODGOVOR_C_IN')
        break
      case '4': string = VizCoreCommands.animationStart('ODGOVOR_D_IN')
        break
    }
    return string
  }
  static deleteAnswer1 (id) {
    let string = ''
    switch (id) {
      case '1': string = VizCoreCommands.animationToStart('TXT_ODGOVOR_A_1_KROG_IN')
        break
      case '2': string = VizCoreCommands.animationToStart('TXT_ODGOVOR_B_1_KROG_IN')
        break
      case '3': string = VizCoreCommands.animationToStart('TXT_ODGOVOR_C_1_KROG_IN')
        break
      case '4': string = VizCoreCommands.animationToStart('TXT_ODGOVOR_D_1_KROG_IN')
        break
    }
    return string
  }
  static deleteAnswer2 (id) {
    let string = ''
    switch (id) {
      case '1': string = VizCoreCommands.animationToStart('TXT_ODGOVOR_A_2_KROG_IN')
        break
      case '2': string = VizCoreCommands.animationToStart('TXT_ODGOVOR_B_2_KROG_IN')
        break
      case '3': string = VizCoreCommands.animationToStart('TXT_ODGOVOR_C_2_KROG_IN')
        break
      case '4': string = VizCoreCommands.animationToStart('TXT_ODGOVOR_D_2_KROG_IN')
        break
    }
    return string
  }
  static deleteAnswer3 (id) {
    let string = ''
    switch (id) {
      case '1': string = VizCoreCommands.animationToStart('TXT_ODGOVOR_A_3_KROG_IN')
        break
      case '2': string = VizCoreCommands.animationToStart('TXT_ODGOVOR_B_3_KROG_IN')
        break
      case '3': string = VizCoreCommands.animationToStart('TXT_ODGOVOR_C_3_KROG_IN')
        break
      case '4': string = VizCoreCommands.animationToStart('TXT_ODGOVOR_D_3_KROG_IN')
        break
    }
    return string
  }

  static BallDrop (id, color, row, money) {
    console.log(id + ' ' + color + ' ' +  row + ' ' +  money)
    const gfxIn = [
      ['MODRA_DESNO_SPODAJ_IN',  'MODRA_DESNO_SREDINA_IN',  'MODRA_DESNO_ZGORAJ_IN'],
      ['ZELENA_DESNO_SPODAJ_IN', 'ZELENA_DESNO_SREDINA_IN', 'ZELENA_DESNO_ZGORAJ_IN'],
      ['RDEC_DESNO_SPODAJ_IN',   'RDEC_DESNO_SREDINA_IN',   'RDEC_DESNO_ZGORAJ_IN']
    ]
    const texts = [
      ['TXT_1','TXT_4','TXT_7'],
      ['TXT_2','TXT_5','TXT_8'],
      ['TXT_3','TXT_6','TXT_9']
    ]
    console.log(texts[color][row])
    return VizCoreCommands.setScene('KVIZ_PIRAMIDA', 'PLAYOUT/DESNE_GRAFIKE') +VizCoreCommands.setTextBasic(texts[color][row], money) + VizCoreCommands.animationStart(gfxIn[color][row])
  }
  static BallDropOut () {
    const gfxIn = [
      ['MODRA_DESNO_SPODAJ_IN',  'MODRA_DESNO_SREDINA_IN',  'MODRA_DESNO_ZGORAJ_IN'],
      ['ZELENA_DESNO_SPODAJ_IN', 'ZELENA_DESNO_SREDINA_IN', 'ZELENA_DESNO_ZGORAJ_IN'],
      ['RDEC_DESNO_SPODAJ_IN',   'RDEC_DESNO_SREDINA_IN',   'RDEC_DESNO_ZGORAJ_IN']
    ]
    return VizCoreCommands.setScene('KVIZ_PIRAMIDA', 'PLAYOUT/DESNE_GRAFIKE') +
    VizCoreCommands.animationToStart(gfxIn[0][0]) +
    VizCoreCommands.animationToStart(gfxIn[0][1]) +
    VizCoreCommands.animationToStart(gfxIn[0][2]) +
    VizCoreCommands.animationToStart(gfxIn[1][0]) +
    VizCoreCommands.animationToStart(gfxIn[1][1]) +
    VizCoreCommands.animationToStart(gfxIn[1][2]) +
    VizCoreCommands.animationToStart(gfxIn[2][0]) +
    VizCoreCommands.animationToStart(gfxIn[2][1]) +
    VizCoreCommands.animationToStart(gfxIn[2][2])
  }
}



let currentQuestionFromDB = {vprasanje: ''}

const getQuestionFromDb = async ( reference ) => {
  MongoClient.connect(url, function(err, db) {
    if (err) throw err
    var dbo = db.db("piramida")
    var query = { referenca: reference }
    dbo.collection("questions").find(query).toArray(function(err, result) {
      if (err) throw err
      console.log(result)
      currentQuestionFromDB = result
      db.close()
    })
  })
}

const setDbQuestionUsed = async ( reference ) => {
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    const dbo = db.db("piramida");
    const myquery = { "referenca": reference };
    const newvalues = { $set: {"uporabljen": Date()} };
    dbo.collection("questions").updateMany(myquery, newvalues, function(err, res) {
      if (err) throw err;
      console.log(`${reference} updated`);
      db.close();
    });
  })
}





const app = express()
const port = 4545

import newTek from './newTek.js'

const client = new net.Socket()




class Audio {
  static TemaPojavi () {
    fetch(`http://${AudioIP}/type/1`)
  }
  static TemaZaklene () {
    fetch(`http://${AudioIP}/type/2`)
  }
  static VprasanjePojavi () {
    fetch(`http://${AudioIP}/type/4`)
  }
  static OdgovorPojavi () {
    fetch(`http://${AudioIP}/type/3`)
  }
  static ZogaPristane () {
    fetch(`http://${AudioIP}/type/7`)
  }
  static OdgovorZaklene () {
    fetch(`http://${AudioIP}/type/6`)
  }
  static Pravilen () {
    fetch(`http://${AudioIP}/type/A`)
  }
  static Napacen () {
    fetch(`http://${AudioIP}/type/S`)
  }
  static Denar () {
    fetch(`http://${AudioIP}/type/W`)
  }
  static Counter () {
    fetch(`http://${AudioIP}/type/H`)
  }
  static FirstRound () {
    fetch(`http://${AudioIP}/type/9`)
  }

}


class LedWallGfx {
  static money (from, to) {
    LedGfxHelper.post('money', {from, to})
    console.log('sent to /money')
    console.log(`from: ${from}, to: ${to}`)
  }
  static moneyStart () {
    LedGfxHelper.put('money')
    console.log('money no input')
  }
  static moneyStop () {
    LedGfxHelper.delete('money')
    console.log('money animation stop')
  }
  static timer60 () {
    LedGfxHelper.put('timer/2')
    console.log('started timer 30s')
  }
  static timer30 () {
    LedGfxHelper.put('timer/1')
    console.log('started timer 30s')
  }
  static logoOnAllScreens () {
    LedGfxHelper.put('init')
    console.log('all screens now have Piramida logo')
  }
  static ballHoleAnimation (id) { // id = 0 -> 7 ---- pomoje
    LedGfxHelper.put(`hole/${id}`)
    console.log(`animation on hole ${id}`)
  }
  static setBackground (id) {
    LedGfxHelper.put(`bground/${id}`)
    console.log(`background ${id}`)
  }
  //ball drop default ??? -> kje to prav pride?
  // tle obvezno preveri, če so taprave barve
  static ballDrop (id) {
    LedGfxHelper.put(`ballDrop`)
    console.log(`balldrop`)
  }
  static ballDropBracket (id, isFinal) {
    LedGfxHelper.post(`ballDrop/${id}/${isFinal ? 1 : 2}`)
    console.log(`balldrop`)
  }

  static sendTopics (categories) {
    LedGfxHelper.post('categories', {cat1: categories[0], cat2: categories[1]})
  }
  static showTopics () {
    LedGfxHelper.put('categories')
    Lights.topic()
  }
  static showTopicsSideScreens (numberOfScreens /*0 - both, 1 - left, 2 - right*/, id) {
    LedGfxHelper.patch(`categories/${numberOfScreens > 0 ? false : true}/${numberOfScreens == 0 ? 1 : numberOfScreens}/${id}`)
  }
  static topicsOut (categories) {
    LedGfxHelper.delete('categories')
  }
  static brackets (krog) {
    LedGfxHelper.put('houses')
  }
  static ballDropNeutral (house, color) {
    LedGfxHelper.postDoubleIdentifier('ballDrop', house, color)
  }
  static ballDropClear (house) {
    LedGfxHelper.delete('ballDrop')
  }
  static setMoney (arr) {
    LedGfxHelper.post('houses', {'0': arr[0], '1': arr[1], '2': arr[2], '3': arr[3], '4': arr[4], '5': arr[5], '6': arr[6], '7': arr[7], '8': arr[8], '9': arr[9], '10': arr[10], '11': arr[11], '12': arr[12], '13': arr[13]})
  }
  static VideoIn () {
    LedGfxHelper.put('video')
  }
  static VideoOut () {
    LedGfxHelper.delete('video')
  }
  static Finale (offered, earned) {
    LedGfxHelper.post('finale', {offered, earned})
  }
  static FinaleShow () {
    LedGfxHelper.put('finale')
  }
  static FinaleOut () {
    LedGfxHelper.delete('finale')
  }

  // question handling
  static sendQuestion(question, a=null, b=null, c=null, d=null) {
    LedGfxHelper.post('quest', {question, answers: [{1: a}, {2: b}, {3: c}, {4: d}]})
    console.log({question, answers: [{1: a}, {2: b}, {3: c}, {4: d}]})
  }
  static showQuestionNext() {
    LedGfxHelper.put('quest')
  }
  static showAnswer(id) {
    LedGfxHelper.patch(`quest/${id}`)
  }
  static sendQuestion3(question, a=null, b=null, c=null, d=null) {
    LedGfxHelper.post('finalQuest', {question, answers: [{1: a}, {2: b}, {3: c}, {4: d}]})
    console.log({question, answers: [{1: a}, {2: b}, {3: c}, {4: d}]})
  }
  static showQuestionNext3() {
    LedGfxHelper.put('finalQuest')
  }
  static deleteOneAnswer3(id) {
    LedGfxHelper.deleteIdentifier('finalQuest', id)
  }
  static deleteOneAnswer(id) {
    LedGfxHelper.deleteIdentifier('quest', id)
  }
  static result(isCorrect) {
    LedGfxHelper.put(`result/${isCorrect}`)
  }
  static selectQuestion(id) {
    LedGfxHelper.patchIdentifier('quest', id)
  }
  static removeGraphics() {
    LedGfxHelper.delete('rmvGraph')
  }
  static duelScore (scores) {
    LedGfxHelper.post('duelScore', {team1: scores[0], team2: scores[1]})
  }
  static duelScoreOut () {
    LedGfxHelper.delete('duelScore')
  }
}

class LedGfxHelper {
  //helper functions for fetching from api
  static post (endpoint, dataObject) {
    fetch(`http://${pathCaspar}/${endpoint}`, {
        method: 'POST',
        body: JSON.stringify(dataObject),
        headers: { 'Content-Type': 'application/json' }
    }).then(res => console.log(res))
  }
  static postIdentifier (endpoint, identifier, dataObject = {}) {
    fetch(`http://${pathCaspar}/${endpoint}/${identifier}`, {
        method: 'POST',
        body: JSON.stringify(dataObject),
        headers: { 'Content-Type': 'application/json' }
    }).then(res => console.log(res))
  }
  static postDoubleIdentifier (endpoint, identifier1, identifier2, dataObject) {
    fetch(`http://${pathCaspar}/${endpoint}/${identifier1}/${identifier2}`, {
        method: 'POST',
        body: JSON.stringify(dataObject),
        headers: { 'Content-Type': 'application/json' }
    }).then(res => console.log(res))
  }
  static put (endpoint, dataObject = {}) {
    fetch(`http://${pathCaspar}/${endpoint}`, {
        method: 'PUT',
        body: JSON.stringify(dataObject),
        headers: { 'Content-Type': 'application/json' }
    }).then(res => console.log(res))
  }
  static putIdentifier (endpoint, identifier, dataObject = {}) {
    fetch(`http://${pathCaspar}/${endpoint}/${identifier}`, {
        method: 'PUT',
        body: JSON.stringify(dataObject),
        headers: { 'Content-Type': 'application/json' }
    }).then(res => console.log(res))
  }
  static delete (endpoint, dataObject) {
    fetch(`http://${pathCaspar}/${endpoint}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
    }).then(res => console.log(res))
  }
  static deleteIdentifier (endpoint, identifier) {
    fetch(`http://${pathCaspar}/${endpoint}/${identifier}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
    }).then(res => console.log(res))
  }
  static patch (endpoint, dataObject) {
    fetch(`http://${pathCaspar}/${endpoint}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' }
    }).then(res => console.log(res))
  }
  static patchIdentifier (endpoint, identifier, dataObject = {}) {
    fetch(`http://${pathCaspar}/${endpoint}/${identifier}`, {
        method: 'PATCH',
        body: JSON.stringify(dataObject),
        headers: { 'Content-Type': 'application/json' }
    }).then(res => console.log(res))
  }
}





const question = (question, answerA, answerB, answerC, answerD) => ({ question, answerA, answerB, answerC, answerD})


let questions = [
  question('ni vprasanja', 'odgovor a', 'odgovor b', 'odgovor c', 'odgovor d'),
  question('ni vprasanja', 'odgovor a', 'odgovor b', 'odgovor c', 'odgovor d'),
  question('ni vprasanja', 'odgovor a', 'odgovor b', 'odgovor c', 'odgovor d'),
  question('ni vprasanja', 'odgovor a', 'odgovor b', 'odgovor c', 'odgovor d')
]

client.connect(nvgPort, nvgIP, () => console.log(`connected to ${nvgIP}:${nvgPort}`))



const playGraphics = (graphics, delays) => {
  graphics.map((gfx, i) => {
    setTimeout( () => {
      console.log(gfx)
      client.write(gfx)
    }, delays[i])
  })
}

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

/* GAME VARIABLES */
let names = ['','','','']
let topics = ['','']
let money = [0,0]
let stage = 0
let currentQuestion = {
  a: "",
  b: "",
  c: "",
  d: "",
  izgovorjava: "",
  pravilen: "",
  prednost: "",
  razlaga: "",
  referenca: "",
  teme: "",
  uporabljen: "",
  vprasanje: ""
}
let prizes = [0,0,0,0,0,0,0,0,0,0,0,0,0,0]
let answerPriority = ['a','b','c','d']
let answerPriority2 = ['a','b','c','d']
let answerPriority3 = ['a','b','c','d']
let answerPriority4 = ['a','b','c','d']
let blockCounter = false
let ballsDroppedCount = 0

app.post('/gamedata', (req, res) => {
  console.log('gamedata =', req.body)
  topics = req.body.topics
  names = req.body.names
  res.sendStatus(200)
})
app.post('/zneski', (req, res) => {
  console.log('zneski =', req.body)
  res.sendStatus(200)
  LedWallGfx.setMoney(req.body)
})

app.get('/firstRoundLight', (req, res) => {
  res.send('stage set')
  console.log(`stage: ${stage}`)
  Audio.FirstRound()
  Lights.FirstRound()
})
app.get('/stage/:no', (req, res) => {
  res.send('stage set')
  stage = req.params.no
  console.log(`stage: ${stage}`)
})
app.get('/timer30', (req, res) => {
  res.send('timer30')
  LedWallGfx.timer30()
  console.log('server got timer30')
})
app.get('/timer60', (req, res) => {
  res.send('timer30')
  LedWallGfx.timer30()
  console.log('server got timer60')
})
app.get('/sendTopics', (req, res) => {
  res.send('send topics')
  LedWallGfx.sendTopics(topics)
  console.log('server got sendTopics')
})
app.get('/showTopics', (req, res) => {
  res.send('show topics')
  LedWallGfx.showTopics(topics)
  Audio.TemaPojavi()
  console.log('server got showTopics')
})
app.get('/closeTopics', (req, res) => {
  res.send('close topics')
  LedWallGfx.topicsOut()
  console.log('server got closeTopics')
})
app.get('/chooseTopic/:team/:id', (req, res) => {
  res.send('choose topic')
  LedWallGfx.showTopicsSideScreens(req.params.team, req.params.id)
  Audio.TemaZaklene()
  console.log(`server got chooseTopics id = ${req.params.id} team = ${req.params.team}`)
})
app.get('/sendQuestion/:numberOfAns', (req, res) => {
  res.send('sendQuestion')
  let priority
  console.log(req.params.numberOfAns)
  switch (Number(req.params.numberOfAns)) {
    case 2: priority = answerPriority2
      break
    case 3: priority = answerPriority3
      break
    case 4: priority = answerPriority4
      break
    default: priority = answerPriority2
  }
  console.log(priority)
  console.log(currentQuestion)
  const commands = [Commands.questionIn2Ans, Commands.questionIn3Ans, Commands.questionIn4Ans]
  playGraphics([commands[stage]()], [10])
  LedWallGfx.sendQuestion(currentQuestion[0].vprasanje,
    'a. ' + currentQuestion[0][priority[0]],
    'b. ' + currentQuestion[0][priority[1]],
    req.params.numberOfAns > 2 ? 'c. ' + currentQuestionFromDB[0][priority[2]] : null,
    req.params.numberOfAns > 3 ? 'd. ' + currentQuestionFromDB[0][priority[3]] : null
  )
  setDbQuestionUsed(currentQuestion[0].referenca)
})
app.get('/sendQuestion3/:numberOfAns', (req, res) => {
  res.send('sendQuestion')
  console.log(currentQuestion)
  console.log('tralala')
  console.log(answerPriority4)
  const commands = [Commands.questionIn2Ans, Commands.questionIn3Ans, Commands.questionIn4Ans]
  playGraphics([Commands.questionIn4Ans()], [10])
  LedWallGfx.sendQuestion3(currentQuestion[0].vprasanje,
    'a. ' + currentQuestion[0].a,
    'b. ' + currentQuestion[0].b,
    req.params.numberOfAns > 2 ? 'c. ' + currentQuestion[0].c : null,
    req.params.numberOfAns > 3 ? 'd. ' + currentQuestion[0].d : null
  )
  setDbQuestionUsed(currentQuestion[0].referenca)
})
app.get('/questionNext', (req, res) => {
  res.send('questionNext')
  console.log(`counter = ${questionGfxCounter} < stage + 2 = ${stage + 2}`)
  Number(questionGfxCounter) < Number(stage) + 2 ? Audio.OdgovorPojavi() : Audio.VprasanjePojavi()
  console.log('question next')
  LedWallGfx.showQuestionNext()
  const commands = [Commands.questionNext2Ans, Commands.questionNext3Ans, Commands.questionNext4Ans]
  playGraphics([commands[stage]()], [10])
})
app.get('/questionNext3', (req, res) => {
  res.send('questionNext')
  console.log(stage)
  console.log('question next')
  Number(questionGfxCounter) < Number(stage) + 2 ? Audio.OdgovorPojavi() : Audio.VprasanjePojavi()
  LedWallGfx.showQuestionNext()
  const commands = [Commands.questionNext2Ans, Commands.questionNext3Ans, Commands.questionNext4Ans]
  playGraphics([commands[stage]()], [10])
})
app.get('/maskaIN', (req, res) => {
  res.send('choose topic')
  playGraphics([Commands.maskaIN()], [10])
})
app.get('/maskaOUT', (req, res) => {
  res.send('choose topic')
  playGraphics([Commands.maskaOUT()], [10])
})
app.get('/deleteOneAnswer/:id', (req, res) => {
  res.send('delete answer')
  console.log('deleting answer')
  LedWallGfx.deleteOneAnswer(req.params.id)
  const commands = [Commands.deleteAnswer1, Commands.deleteAnswer2, Commands.deleteAnswer3]
  playGraphics([commands[stage](req.params.id)], [10])
})
app.get('/showCorrect', (req, res) => {
  res.send('delete answer')
  console.log('show answer')
  const commands = [Commands.deleteAnswer1, Commands.deleteAnswer2, Commands.deleteAnswer3]
  switch (currentQuestion.pravilen) {
    case 'a':
      LedWallGfx.showAnswer(1)
      playGraphics([commands[stage](2)], [10])
      playGraphics([commands[stage](3)], [10])
      playGraphics([commands[stage](4)], [10])
      break
    case 'b':
      LedWallGfx.showAnswer(2)
      playGraphics([commands[stage](1)], [10])
      playGraphics([commands[stage](3)], [10])
      playGraphics([commands[stage](4)], [10])
      break
    case 'c':
      LedWallGfx.showAnswer(3)
      playGraphics([commands[stage](1)], [10])
      playGraphics([commands[stage](2)], [10])
      playGraphics([commands[stage](4)], [10])
      break
    case 'd':
      LedWallGfx.showAnswer(4)
      playGraphics([commands[stage](1)], [10])
      playGraphics([commands[stage](2)], [10])
      playGraphics([commands[stage](3)], [10])
      break
  }
  LedWallGfx.deleteOneAnswer(req.params.id)
  playGraphics([commands[stage](req.params.id)], [10])
})
app.get('/showCorrect3', (req, res) => {
  res.send('delete answer')
  console.log('deleting answer')
  const commands = [Commands.deleteAnswer1, Commands.deleteAnswer2, Commands.deleteAnswer3]
  switch (currentQuestion.pravilen) {
    case 'a':
      LedWallGfx.deleteOneAnswer(2)
      LedWallGfx.deleteOneAnswer(3)
      LedWallGfx.deleteOneAnswer(4)
      playGraphics([commands[stage](2)], [10])
      playGraphics([commands[stage](3)], [10])
      playGraphics([commands[stage](4)], [10])
      break
    case 'b':
      LedWallGfx.deleteOneAnswer(1)
      LedWallGfx.deleteOneAnswer(3)
      LedWallGfx.deleteOneAnswer(4)
      playGraphics([commands[stage](1)], [10])
      playGraphics([commands[stage](3)], [10])
      playGraphics([commands[stage](4)], [10])
      break
    case 'c':
      LedWallGfx.deleteOneAnswer(1)
      LedWallGfx.deleteOneAnswer(2)
      LedWallGfx.deleteOneAnswer(4)
      playGraphics([commands[stage](1)], [10])
      playGraphics([commands[stage](2)], [10])
      playGraphics([commands[stage](4)], [10])
      break
    case 'd':
      LedWallGfx.deleteOneAnswer(1)
      LedWallGfx.deleteOneAnswer(2)
      LedWallGfx.deleteOneAnswer(3)
      playGraphics([commands[stage](1)], [10])
      playGraphics([commands[stage](2)], [10])
      playGraphics([commands[stage](3)], [10])
      break
  }
  LedWallGfx.deleteOneAnswer(req.params.id)
  playGraphics([commands[stage](req.params.id)], [10])
})
app.get('/gfxOut', (req, res) => {
  res.send('gfx out')
  console.log('gfx out')
  LedWallGfx.removeGraphics()
  const commands = [Commands.questionOut2Ans, Commands.questionOut3Ans, Commands.questionOut4Ans]
  playGraphics([commands[stage]()], [10])
})
app.get('/answerSelect/:id', (req, res) => {
  res.send('answer select')
  console.log(`selected ${req.params.id}`)
  LedWallGfx.selectQuestion(req.params.id)
  playGraphics([Commands.chooseAnswer(req.params.id)], [10])
  Audio.OdgovorZaklene()
})
app.get('/backgroundNeutral', (req, res) => {
  res.send('settting neutral background')
  console.log(`setting background neutral`)
  LedWallGfx.setBackground(0)
})
app.get('/result/:isCorrect', (req, res) => {
  res.send('settting neutral background')
  console.log(`setting background neutral`)
  LedWallGfx.result(req.params.isCorrect)
  playGraphics([req.params.isCorrect  == 'true' ? Commands.CorrectAns() : Commands.WrongAns()], [10])
  req.params.isCorrect  == 'true' ? Audio.Pravilen() : Audio.Napacen()
  req.params.isCorrect  == 'true' ? Lights.right() : Lights.wrong()
})
app.get('/ballAnimation/:id', (req, res) => {
  res.send(`ball animation`)
  console.log(`ball animation on ${req.params.id}`)
  LedWallGfx.ballHoleAnimation(req.params.id)
  Lights.holeSelect(req.params.id)
})
app.get('/ballAnimationRed/:id', (req, res) => {
  res.send(`ball animation`)
  console.log(`ball animation on ${req.params.id}`)
  Lights.holeSelectRed(req.params.id)
})
app.get('/init', (req, res) => {
  res.send(`init`)
  console.log(`init`)
  LedWallGfx.logoOnAllScreens()
})
app.get('/brackets', (req, res) => {
  res.send('brackets')
  console.log('brackets')
  LedWallGfx.brackets(0)
})
app.get('/ballDropNeutral/:id/:color/:money', (req, res) => {
  res.send('ballDropNeutral')
  console.log(`balldrop to: ${req.params.id}, color: ${req.params.color}`)
  LedWallGfx.ballDropNeutral(req.params.id, req.params.color)
  playGraphics([Commands.BallDrop(req.params.id, req.params.color, ballsDroppedCount, req.params.money)], [10])
  ballsDroppedCount ++
  switch (Number(req.params.color)) {
    case 0: Lights.bracketsWhite(req.params.id)
      break
    case 1: Lights.bracketsGreen(req.params.id)
      break
    case 2: Lights.bracketsRed(req.params.id)
      break
    default: Lights.bracketsWhite(req.params.id)
  }
  Audio.ZogaPristane()
})
app.get('/ballDropVizOut', (req, res) => {
  res.send('ballDropClear')
  console.log('balldrop cleared')
  ballsDroppedCount = 0
  playGraphics([Commands.BallDropOut()],[10])
})
app.get('/ballDropClear', (req, res) => {
  res.send('ballDropClear')
  console.log('balldrop cleared')
  ballsDroppedCount = 0
  LedWallGfx.ballDropClear()
  LedWallGfx.setBackground(0)
  Lights.clearBrackets()
})
app.get('/money/:from/:to', (req, res) => {
  res.send('money')
  console.log('money')
  LedWallGfx.money(req.params.from, req.params.to)
  Audio.Denar()
})
app.get('/moneyStart', (req, res) => {
  res.send('money start')
  console.log('money start')
  LedWallGfx.moneyStart()
  Audio.Counter()
})
app.get('/moneyOnAir/:value', (req, res) => {
  res.send('money start')
  console.log([Commands.denar(req.params.value)])
  playGraphics([Commands.denar(req.params.value)], [10])
  Audio.Denar()
})
app.get('/moneyOnAirOut', (req, res) => {
  res.send('money OUT')
  playGraphics([Commands.denarOUT()], [10])
})
app.get('/moneyStop', (req, res) => {
  res.send('money stop')
  console.log('money stopt')
  LedWallGfx.moneyStop()
})
app.get('/duelScore/:team1/:team2', (req, res) => {
  res.send('duel score')
  console.log(`duel score -> team1: ${req.params.team1},  team2: ${req.params.team2}`)
  LedWallGfx.duelScore([req.params.team1, req.params.team2])
})
app.get('/duelScoreOut', (req, res) => {
  res.send('duel score OUT')
  console.log(`duel score OUT`)
  LedWallGfx.duelScoreOUT()
})

app.get('/ballDrop', (req, res) => {
  res.send('ball drop')
  console.log('ball drop')
  LedWallGfx.ballDrop()
})
app.get('/ballBracket/:id/:isFinal', (req, res) => {
  res.send('ball drop')
  console.log('ball drop')
  LedWallGfx.ballDropBracket(req.params.id, req.params.isFinal)
})
app.get('/videoIn', (req, res) => {
  res.send('ball drop')
  console.log('ball drop')
  LedWallGfx.VideoIn()
})
app.get('/videoOut', (req, res) => {
  res.send('ball drop')
  console.log('ball drop')
  LedWallGfx.VideoOut()
})
app.get('/finale/:offered/:earned', (req, res) => {
  res.send('finale setup')
  console.log('finale setup')
  LedWallGfx.Finale(req.params.offered, req.params.earned)
})
app.get('/finaleShow', (req, res) => {
  res.send('finale show')
  console.log('finale show')
  LedWallGfx.FinaleShow()
})
app.get('/finaleOut', (req, res) => {
  res.send('finale out')
  console.log('finale out')
  LedWallGfx.FinaleOut()
})


// questions handling
app.get('/questions', (req, res) => {
  res.json({questions})
})
app.get('/currentQuestion/:reference', (req, res) => {
  if (req.params.reference.length > 2) {
    getQuestionFromDb(req.params.reference)
    console.log(req.params.reference)
  }
  setTimeout(() => {
    res.json(currentQuestionFromDB)
    currentQuestion = currentQuestionFromDB
    answerPriority2 = getAnswersWithPriority(currentQuestionFromDB[0].prednost, 2)
    answerPriority3 = getAnswersWithPriority(currentQuestionFromDB[0].prednost, 3)
    answerPriority4 = getAnswersWithPriority(currentQuestionFromDB[0].prednost, 4)
  }, 50)
})
app.post('/questionsFile', (req, res) => {
  try {
  fs.readFile(`${req.body.path}`, 'utf8', (err, data) => {
    if (err) throw err
    const questionsUnstructured = parse(data, {
      columns: true,
      skip_empty_lines: true
    })
    questions = questionsUnstructured
  })
  } catch (err) {
    console.log(err)
  }
})
app.use('/', express.static( __dirname + '/voditeljica-react/build'))

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname,  './voditeljica-react/build/index.html'))
})

app.listen(port, () => console.log(`Listening on at http://localhost:${port}`))
