{

    class Clock{

        time = 0; //Time will be in seconds.
        timeInterval = null;

        //Extra stuff
        registeredTime = [];

        constructor() { 
            console.log("Clock is created.");
        }

        start(work){

            if(this.timeInterval != null){
                throw new Error("Clock is already running.")
            }

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

                this.registeredTime.push(this.getFormattedTime());
            }else{
                throw new Error("Clock is already stopped.")
            }
            
        }

        reset(){
            if(this.timeInterval != null){
                clearInterval(this.timeInterval);
                this.timeInterval = null;
            }
            this.time = 0;
            this.registeredTime = [];
        }

        //This will give time in format MM:SS (M - Minutes, S-seconds)
        getFormattedTime(){
            let time = this.time;

            let minute = Math.floor(time / 60);
            let second = time % 60;

            minute = minute.toLocaleString('en-US', {
                minimumIntegerDigits: 2,
                useGrouping: false
            });

            second = second.toLocaleString('en-US', {
                minimumIntegerDigits: 2,
                useGrouping: false
            });

            time = minute + ":" + second;

            return time;
        }
    }
    

    let clock = new Clock();

    //update the UI funtion which will be called in clock.start() funciton.
    // see startButton on clock event function.
    let updateUI = function (){
        
        const timeDisplayElem = document.getElementById('time-display');

        let time = clock.getFormattedTime();
        timeDisplayElem.innerText = time;

        //Extra stuff

        const registeredTimeElem = document.getElementById('registered-times');
        registeredTimeElem.innerHTML = ''; //clearing the list to append fresh childs
        
        clock.registeredTime.forEach(times=>{
            //Update the list elements
            let li = document.createElement("li");
            li.appendChild(document.createTextNode(times));
            li.classList.add('list-group-item');
            
            registeredTimeElem.appendChild(li); // each element added to list
        });
    }
    updateUI();


    //Registering the button clicks
    const resetButton = document.getElementById('clock-reset-btn');
    const stopButton = document.getElementById('clock-stop-btn');
    const startButton = document.getElementById('clock-start-btn');

    //each time a button is press we need to add update UI to see the updated list. Extra feature.
    resetButton.addEventListener('click', (e)=>{
        clock.reset();
        updateUI();
    })
    stopButton.addEventListener('click', (e)=>{
        clock.stop();
        updateUI();
    })
    startButton.addEventListener('click', (e)=>{
        clock.start(updateUI);
    })


}