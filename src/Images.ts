import wallsImageFile from './assets/Images/walls.png'
import itemsImageFile from './assets/Images/items.png'
import charactersImageFile from './assets/Images/specialCharacters.png'
import specialItemsFile from './assets/Images/specialItems.png'

class Images{
    wallsPhoto: HTMLImageElement=new Image()
    wallsPhotoOrigin: HTMLImageElement=new Image()
    itemsPhoto: HTMLImageElement=new Image()
    charactersPhoto: HTMLImageElement=new Image()
    specialItemsPhoto: HTMLImageElement=new Image()

    constructor(){
        let photo = new Image()
        photo.src = charactersImageFile
        photo.onload = () => {
            this.charactersPhoto = photo
        }

        let photo3 = new Image()
        photo3.src = wallsImageFile
        photo3.onload = () => {
            this.wallsPhoto = photo3
            this.wallsPhotoOrigin = photo3
        }

        let photo4 = new Image()
        photo4.src = specialItemsFile
        photo4.onload = () => {
            this.specialItemsPhoto = photo4
        }

        let photo2 = new Image()
        photo2.src = itemsImageFile
        photo2.onload = () => {
            let canvas = document.createElement("canvas") 
            canvas.width = 390
            canvas.height = 16
            let ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
            ctx.imageSmoothingEnabled = false;

            ctx.drawImage(
                photo2,
                0,
                0,
                390,
                16,
                0,
                0,
                390,
                16
            );

            ctx.save()
            let img = document.createElement("img") as HTMLImageElement;
            img.src = canvas.toDataURL()
         
            this.itemsPhoto = img
        }
    }
 }

 export default new Images()