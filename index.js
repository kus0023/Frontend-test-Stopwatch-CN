{

    class Clock{
        time = 0;
        timeInterval = null;

        constructor() { 
            console.log("Clock is created.");
        }

        start(work){
            let self = this;
            this.timeInterval = setInterval(function(){
                self.time++;
                
                if(typeof work == 'function'){
                    work();
                }
            }, 1000);
            
        }

        stop(){
            clearInterval(this.timeInterval);
        }

        reset(){
            this.time = 0;
            clearInterval(this.timeInterval);
        }
    }
    

    let clock = new Clock();

    let updateDom = function (){
        const timeDisplayElem = document.getElementById('time-display');

        let minutes = Math.floor(clock.time / 60);
        let seconds = clock.time % 60;
        timeDisplayElem.innerText = minutes+":"+seconds;
    }

    clock.start(updateDom);

    setTimeout(()=>{
        clock.reset();
    }, 2 * 60 * 1000);



    

}