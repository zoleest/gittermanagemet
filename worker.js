self.onmessage = function (e) {
     
    
    if(e.data === "start-time") {
         const notification = new Notification("Műszak elindítva!", {icon: './android-chrome-192x192.png'});
 
    }

    if(Array.isArray(e.data)){

     if(e.data[0] === "last_gitter"){
          const notification = new Notification(`Utolsó gitter itt: ${e.data[1]}!`, {icon: './android-chrome-192x192.png'});

     }

}
     
     
 }