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
                
                //checking if parameter exists as funtion if yes then call the function otherwise not.
                if(typeof work == 'function'){
                    work();
                }else{
                    //resetting the clock before throwing error othereise it will keep on shiwing this error.
                    self.reset();
                    throw new Error("Count.start function needs one function parameter.");
                    
                }
            }, 1000);
            
        }

        stop(){
            if(this.timeInterval != null){
                clearInterval(this.timeInterval);
                this.timeInterval = null;
            }
            
        }

        reset(){
            if(this.timeInterval != null){
                clearInterval(this.timeInterval);
                this.timeInterval = null;
            }
            this.time = 0;
        }
    }
    

    let clock = new Clock();

    //update the UI
    let updateUI = function (){
        console.log(clock.time);
        const timeDisplayElem = document.getElementById('time-display');

        let minutes = Math.floor(clock.time / 60);
        let seconds = clock.time % 60;
        timeDisplayElem.innerText = minutes+":"+seconds;
    }

    clock.start(updateUI);


    //Registering the button clicks
    const resetButton = document.getElementById('clock-reset-btn');
    const stopButton = document.getElementById('clock-stop-btn');
    const startButton = document.getElementById('clock-start-btn');

    resetButton.addEventListener('click', (e)=>{
        clock.reset();
        updateUI();
    })
    stopButton.addEventListener('click', (e)=>{
        clock.stop();
    })
    startButton.addEventListener('click', (e)=>{
        clock.start(updateUI);
    })


}