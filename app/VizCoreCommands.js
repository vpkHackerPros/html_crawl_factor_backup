export default class VizCoreCommands {
  static setScene         = (project, scene)  => `0 RENDERER SET_OBJECT SCENE*${project}/${scene}\0`
  static setTextBasic     = (container, text) => `0 RENDERER*TREE*$${container}*GEOM*TEXT SET ${text}\0`
  static setTextPlugin    = (container, text) => `0 RENDERER*TREE*$${container}*FUNCTION*TFxWrite*Text SET ${text}\0`
  static animationStart   = (animationName)   => `0 RENDERER*STAGE*DIRECTOR*$${animationName} START\0`
  static animationToStart = (animationName)   => `0 RENDERER*STAGE*DIRECTOR*$${animationName} SHOW START\0`
  static animationToEnd   = (animationName)   => `0 RENDERER*STAGE*DIRECTOR*$${animationName} SHOW END\0`
}