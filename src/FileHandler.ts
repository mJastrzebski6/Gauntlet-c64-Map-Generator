"use strict";

import { MapObjectInterface } from "./Interfaces";

class FileHandler {

  saveToFile(MapObject:MapObjectInterface) {
    let json = JSON.stringify(MapObject);
    let blob = new Blob([json], { type: "text/javascript" });
    let a = document.createElement("a");
    let url = URL.createObjectURL(blob);
    a.href = url;
    a.download = `map${MapObject.levelNumber}.json`;
    a.click();
  }
}
export default new FileHandler();
