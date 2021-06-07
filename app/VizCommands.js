const VizTemplate = require('./VizCoreCommands.js')


class Commands {
  //projek -> KVIZ_PIRAMIDA/PLAYOUT
  static denarIN () {
    return VizTemplate.setScene('KVIZ_PIRAMIDA', 'PLAYOUT/DENAR_CENTER') + VizTemplate.animationStart('DENAR_CENTER_IN') 
  }
}


export default Commands