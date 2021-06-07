/*
 *
 *  handla:
 *    - VIZRT na NVG01 -> grafike
 *    - Metus -> snemanje
 *    - Yamahino mešalko -> audio scene
 *
 *  - podatke iz front-enda dobim preko POST requestov
 *  - triggerje iz Tricasterja dobim preko GET requestov
 *  - z metusom se pogovarjam po socketu
 *  - za mešalko prek druzga serverja, ki upravlja z MIDI interfacom, kličem scene
 *
 *
 * */


const express = require('express')
const bodyParser = require('body-parser')
const net = require('net')
const { exec } = require('child_process')
const fs = require('fs')
const app = express()
const port = 4545

import newTek from './newTek.js'
import VizCommands from './VizCommands.js'
import metus from './METUS_COMMANDS.js' 

const VIZ = new VizCommands()
const client = new net.Socket()


const MIDI_DEVICE_NAME = 'UM-ONE'
const nvgIP = 'localhost'
const nvgPort = 6100
const metusPort = 32106
const metusIP = '192.168.11.22'

let startData = {}
let secondData = {}
let viri = {}
let gosti = {gost: ['','']}
let trenutnaTema = ''
let crawlText = {text: 'Gledate Faktor.'}


const getMetusFileName = () => {
  const today = new Date()
  const name = `FAKTOR_${today.getFullYear()}_${today.getDate()}_${today.getMonth()}`
  console.log(`metus name: ${name}`)
  return name
}


/* Crawl se veckrat klice, zato da sploh kej počne -> mande da je tko 'treba' */
const startDelays = [1500, 2300, 4000, 15000, 15300, 20000]
const startGraphics = () => [
  VIZ.crawl_LOAD() + VIZ.crawl_SetText(crawlText) + VIZ.crawl_BUILD() + VIZ.crawl_START(),
  VIZ.crawl_LOAD() + VIZ.crawl_SetText(crawlText) + VIZ.crawl_BUILD() + VIZ.crawl_START(),
  VIZ.crawl_LOAD() + VIZ.crawl_SetText(crawlText) + VIZ.crawl_BUILD() + VIZ.crawl_START(),
  VIZ.tema_IN(startData.tema) + VIZ.podpis_IN(startData.podpis),
  VIZ.crawl_IN() + VIZ.crawl_START(),
  VIZ.podpis_OUT()
]
const afterAddsDelays = [1500, 1000, 4000, 15000, 15300]
const afterAddsGraphics = () => [
  VIZ.crawl_LOAD() + VIZ.crawl_SetText(crawlText) + VIZ.crawl_BUILD() + VIZ.crawl_START(),
  VIZ.crawl_LOAD() + VIZ.crawl_SetText(crawlText) + VIZ.crawl_BUILD() + VIZ.crawl_START(),
  VIZ.crawl_LOAD() + VIZ.crawl_SetText(crawlText) + VIZ.crawl_BUILD() + VIZ.crawl_START(),
  VIZ.tema_IN(trenutnaTema) ,
  VIZ.crawl_IN() + VIZ.crawl_START(),
]
const basicDelays = [10, 1500, 2500, 2600]
const basicGraphics = () => [
  VIZ.crawl_LOAD() + VIZ.crawl_SetText(crawlText) + VIZ.crawl_BUILD() + VIZ.crawl_START(),
  VIZ.crawl_LOAD() + VIZ.crawl_SetText(crawlText) + VIZ.crawl_BUILD() + VIZ.crawl_START(),
  VIZ.tema_IN(trenutnaTema) ,
  VIZ.crawl_IN() + VIZ.crawl_START(),
]

const triplexSubDelays = [10, 5010]




// ---------------------- HELPER FUNKCIJE -----------------------//
/* 
const playGraphics = (graphics, delays) => {
  graphics.map((gfx, i) => {
    setTimeout( () => {
      console.log(gfx)
      client.connect(nvgPort, nvgIP, () => {
      client.write(gfx)
      client.on("data", (data) => {
        console.log("received data")
        console.log( data.toString() )
        client.destroy()
      })
    })}, delays[i])
  })
}
*/
const playGraphics = (graphics, delays) => {
  graphics.map((gfx, i) => {
    setTimeout( () => {
      console.log(gfx)
      client.connect(nvgPort, nvgIP, () => {
      client.write(gfx)
      client.destroy()
    })}, delays[i])
  })
}
const metusSendCommand = (commandString) => {
  const socket = net.connect(metusPort, metusIP, () => {
      console.log(`Sending: ${commandString}`)
      socket.write(commandString)
      socket.on("data", (data) => {
        console.log("received data")
        console.log( data.toString() )
        socket.end()
      })
  })
  socket.on("error", (err) => {
    console.log("Error");
    console.log(err);
  })

}




const metusRecord = () => {
  const socket = net.connect(metusPort, metusIP, () => {
    console.log("Sending data");
    socket.write('Start "Encoder 1"\r\n')
    socket.on("data", (data) => {
      console.log("received data");
      console.log( data.toString() );
      socket.end();
    })
  })
  socket.on("error", (err) => {
    console.log("Error");
    console.log(err);
  })
}
const metusStop = () => {
  const socket = net.connect(metusPort, metusIP, () => {
    console.log("Sending data");
    socket.write('Stop "Encoder 1"\r\n')
    socket.on("data", (data) => {
      console.log("received data");
      console.log( data.toString() );
      socket.end();
    })
  })
  socket.on("error", (err) => {
    console.log("Error");
    console.log(err);
  })
}
const metusPause = () => {
  const socket = net.connect(metusPort, metusIP, () => {
    console.log("Sending data");
    socket.write('pause "Encoder 1"\r\n')
    socket.on("data", (data) => {
      console.log("received data");
      console.log( data.toString() );
      socket.end();
    })
  })
  socket.on("error", (err) => {
    console.log("Error");
    console.log(err);
  })
}
const metusName = (name) => {
  const socket = net.connect(metusPort, metusIP, () => {
    console.log("Sending data");
    socket.write(`Setfile "Encoder 1" "${name}"\r\n`)
    socket.on("data", (data) => {
      console.log("received data");
      console.log( data.toString() );
      socket.end();
    })
  })
  socket.on("error", (err) => {
    console.log("Error");
    console.log(err);
  })
}


// ---------------------- FUNKCIJE, KI SE ZGODIJO PO GETih -----------------------//
const basicGraphicsIn = () => {
  playGraphics(basicGraphics(), basicDelays)
}
const start = () => {
  metusName(getMetusFileName())
  metusRecord()
  console.log('Initiating start sequence. Buckle up.')
  playGraphics(startGraphics(), startDelays)
  trenutnaTema = startData.tema
}
const drugaTemaFun = () => {
  playGraphics([VIZ.tema_OUT(), VIZ.tema_IN(secondData.tema)], [1100, 1500])
  trenutnaTema = secondData.tema
}
const preAdds = () => {
  const audioNumber = 5
  console.log('... cast your light on us. For the adds are dark and full of terrors.')
  metusPause()
  playGraphics([VIZ.podpis_OUT(), VIZ.tema_OUT(), VIZ.crawl_STOP(), VIZ.crawl_OUT()], [100, 200])
  playGraphics([VIZ.crawl_OUT()], [500])
}
const afterAdds = () => {
  metusRecord()
  const audioNumber = 5
  console.log('Hit me baby one more time')
  playGraphics(afterAddsGraphics(), afterAddsDelays)
}
const end = () => {
  const audioNumber = 5
  metusStop()
  console.log('In the end it doesnt even matter')
  setTimeout(() => {
    metusName('\\[year][month][day]-[hour][minute][second]_[encoder]')
  }, 10000)
}
const refreshCrawl = () => {
  playGraphics([VIZ.crawl_LOAD() + VIZ.crawl_SetText(crawlText) + VIZ.crawl_BUILD() + VIZ.crawl_START()], [10, 1500, 2000])
}

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())



//--------------------------- END POINTI ------------------------------//
//ROOT end point
app.get('/', (req, res) => res.send('Look what you have done to my BOOoY!'))

//Show sections end points
app.get('/basicIn', (req, res) => {
  res.send('Initiating start sequence. Buckle up.')
  basicGraphicsIn()
})
app.get('/start', (req, res) => {
  res.send('Initiating start sequence. Buckle up.')
  start()
})
app.get('/preAdds', (req, res) => {
  res.send('Initiating start sequence. Buckle up.')
  preAdds()
})
app.get('/afterAdds', (req, res) => {
  res.send('Initiating start sequence. Buckle up.')
  afterAdds()
})
app.get('/end', (req, res) => {
  res.send('Initiating start sequence. Buckle up.')
  end()
})



//TriCaster MACRO get request handlers
app.get('/pobrisiGrafiko', (req, res) => {
  console.log('POOOOOOOOOBRISI')
  res.send('Good bye my friend its time to die.')
  playGraphics([VIZ.podpis_OUT(), VIZ.tema_OUT(), VIZ.crawl_STOP(), VIZ.crawl_OUT()], [100, 200, 300, 400])
  playGraphics([VIZ.crawl_OUT()], [500])
})
app.get('/triplexPodpis', (req, res) => {
  res.send('Minty fresh.')
  playGraphics([ VIZ.podpis_triplex_IN([ startData.podpis, gosti.gost[0], gosti.gost[1] ]), VIZ.podpis_triplex_OUT()], triplexSubDelays)
})
app.get('/refreshCrawl', (req, res) => {
  res.send('Minty fresh.')
  refreshCrawl()
})
app.get('/refreshCrawl1', (req, res) => {
  res.send('Minty fresh.')
  refreshCrawl1()
})
app.get('/drugaTema', (req, res) => {
  res.send('Initiating start sequence. Buckle up.')
  drugaTemaFun()
})
app.get('/prikaziGosta1', (req, res) => {
  res.send('May the source be with you.')
  playGraphics([VIZ.podpis_IN(gosti.gost[0]), VIZ.podpis_OUT()], [100, 3000])
})
app.get('/prikaziGosta2', (req, res) => {
  res.send('May the source be with you.')
  playGraphics([VIZ.podpis_IN(gosti.gost[1]), VIZ.podpis_OUT()], [100, 3000])
})
app.get('/prikaziVir1', (req, res) => {
  res.send('May the source be with you.')
  playGraphics([VIZ.podpis_IN(viri.vir[0]), VIZ.podpis_OUT()], [0, 5000])
})
app.get('/prikaziVir2', (req, res) => {
  res.send('May the source be with you.')
  playGraphics([VIZ.podpis_IN(viri.vir[1]), VIZ.podpis_OUT()], [0, 5000])
})
app.get('/prikaziVir3', (req, res) => {
  res.send('May the source be with you.')
  playGraphics([VIZ.podpis_IN(viri.vir[2]), VIZ.podpis_OUT()], [0, 5000])
})
app.get('/prikaziVir4', (req, res) => {
  res.send('May the source be with you.')
  playGraphics([VIZ.podpis_IN(viri.vir[3]), VIZ.podpis_OUT()], [0, 5000])
})
app.get('/prikaziVir5', (req, res) => {
  res.send('May the source be with you.')
  playGraphics([VIZ.podpis_IN(viri.vir[4]), VIZ.podpis_OUT()], [0, 5000])
})
app.get('/prikaziVir6', (req, res) => {
  res.send('May the source be with you.')
  playGraphics([VIZ.podpis_IN(viri.vir[5]), VIZ.podpis_OUT()], [0, 5000])
})
app.get('/prikaziVir7', (req, res) => {
  res.send('May the source be with you.')
  playGraphics([VIZ.podpis_IN(viri.vir[6]), VIZ.podpis_OUT()], [0, 5000])
})
app.get('/prikaziVir8', (req, res) => {
  res.send('May the source be with you.')
  playGraphics([VIZ.podpis_IN(viri.vir[7]), VIZ.podpis_OUT()], [0, 5000])
})
app.get('/prikaziVir9', (req, res) => {
  res.send('May the source be with you.')
  playGraphics([VIZ.podpis_IN(viri.vir[8]), VIZ.podpis_OUT()], [0, 5000])
})



/*  Post requesti, da dobim podatke in react frontenda.  */
app.post('/startData', (req, res) => {
  console.log('startData =', req.body)
  startData = req.body
  res.sendStatus(200)
})
app.post('/secondData', (req, res) => {
  console.log('secondData =', req.body)
  secondData = req.body
  res.sendStatus(200)
})
app.post('/setAndPlayVir', (req, res) => {
  console.log('viri =', req.body)
  viri = req.body
  res.sendStatus(200)
})
app.post('/gosti', (req, res) => {
  console.log('gosti =', req.body)
  gosti = req.body
  res.sendStatus(200)
})
app.post('/crawlText', (req, res) => {
  console.log('Got body:', req.body)
  fs.readFile(`${req.body.path}`, 'utf8', (err, data) => {
    if (err) throw err
    console.log(data)
    crawlText = data.replace(/\"/g, "˝")
  })
})

app.listen(port, () => console.log(`Listening on at http://localhost:${port}`))
