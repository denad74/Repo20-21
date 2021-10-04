const Keyboard = {
    elements: {
        main: null,
        keysContainer: null,
        keys: []
    },

    eventHendlers: {
        oninput: null,
        onclose: null           
    },

    properties: {
        value: "",
        capsLock: false
    },

    init() {
        // Create main elements
        this.elements.main = document.createElement("div");
        this.elements.keysContainer = document.createElement("div");

        //  Setup main elements

        this.elements.main.classList.add("keyboard", "keyboard-hidden")
        this.elements.keysContainer.classList.add("keyboard-keys")
        this.elements.keysContainer.appendChild(this._createKeys());

        this.elements.keys = this.elements.keysContainer.querySelectorAll(".keyboard-key");

        // Add the dom

        this.elements.main.appendChild(this.elements.keysContainer);
        document.body.appendChild(this.elements.main);

        // Automaticly use keboard for elements with .use-keboard-input
        document.querySelectorAll(".use-keyboard-input").forEach(element => {
            element.addEventListener("focus", () => {
                this.open(element.value, currentValue => {
                    element.value = currentValue;
                })
            })
        })
    },

    _createKeys() {
        const fragment = document.createDocumentFragment();
        const keyLayout =[ 
            "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "backspace",
            "q", "w", "e", "r", "t", "y", "u", "i", "o", "p",  // 35 minuta za breqaakline
            "a", "s", "d", "f", "g", "h", "j", "k", "l", "capslock",
            "z", "x", "c", "v", "b", "n", "m", "-", "_", "shift",
            "submit", "space", "enter"
        ];

        // Create  HTML keyName
        const createHTMLtag = (tagName) => {return `<span>${tagName}</span>`};
        
        
        keyLayout.forEach(key => {
            const keyElement = document.createElement("button");
            const insertLineBreak = ["backspace", "p", "capslock", "shift"].indexOf(key) !== -1;

            // Add atributer/classes

            keyElement.setAttribute("type", "button");
            keyElement.classList.add("keyboard-key");

            switch (key) {
                case "backspace":
                keyElement.classList.add("keyboard-key-small");
                keyElement.innerHTML = createHTMLtag("BackSpace");
               
                keyElement.addEventListener("click", () => {
                    this.properties.value = this.properties.value.substring(0, this.properties.value.length - 1);
                    this._triggerEvent("oninput");
                });

                break; 
                
                case "capslock":

                    keyElement.classList.add("keyboard-key-medium",);
                    keyElement.innerHTML = createHTMLtag("capslock");
                   
                    keyElement.addEventListener("click", () => {
                        this._toogleCapsLock();
                        
                    });
                    
                break; 

                case "shift":
                    keyElement.classList.add("keyboard-key-medium");
                    keyElement.textContent = key.toLowerCase();
                    keyElement.innerHTML = createHTMLtag("Shift");
                    keyElement.addEventListener("click", () => {
                        this._toogleCapsLock();
                       
                    });
                    
                break; 

                case "enter":
                    keyElement.classList.add("keyboard-key-medium");
                    keyElement.innerHTML = createHTMLtag("ENTER");
                    keyElement.addEventListener("click", () => {
                        this.properties.value += "\n ";
                        this._triggerEvent("oninput");
                    });
                    
                break; 

                case "space":
                    keyElement.classList.add("keyboard-key-large");
                    keyElement.innerHTML = createHTMLtag("space");
                    keyElement.addEventListener("click", () => {
                        this.properties.value += " ";
                        this._triggerEvent("oninput");
                    });
                    
                break; 
                
                case "submit":
                    keyElement.classList.add("keyboard-key-medium");
                    keyElement.innerHTML = createHTMLtag("OK");
                    keyElement.addEventListener("click", () => {
                        this.close();
                        this._triggerEvent("onclose");
                    });
                    
                break;

                default:
                    keyElement.textContent = key.toLowerCase();
                   
                    keyElement.addEventListener("click", () => {
                        this.properties.value += this.properties.capsLock ? key.toUpperCase() : key.toLowerCase();
                        this._triggerEvent("oninput");
                    });
                    
                break;
            }

            fragment.appendChild(keyElement);

            if (insertLineBreak) {
                fragment.appendChild(document.createElement("br"));
            }

        });

        return fragment;

    },

    _triggerEvent(hendlerName) {
        if (typeof this.eventHendlers[hendlerName] == "function") {
            this.eventHendlers[hendlerName](this.properties.value);
        }
    },

    _toogleCapsLock() {
        this.properties.capsLock = !this.properties.capsLock;

        for(const key of this.elements.key) {
            if(key.childElementCount === 0) {
                key.textContent = this.properties.capsLock ? key.textContent.toUpperCase() : key.textContent.toLowerCase();
            }
        }
    },

    open(initialValue, oninput, onclose) {
        this.properties.value = initialValue || "";
        this.eventHendlers.oninput = oninput;
        this.eventHendlers.onclose = onclose;
        this.elements.main.classList.remove("keyboard-hidden");
    },

    close(){
        this.properties.value = "";
        this.eventHendlers.onclose = oninput;
        this.eventHendlers.onclose = onclose;
        this.elements.main.classList.add("keyboard-hidden");
    }

};


window.addEventListener("DOMContentLoaded" , function () {
    Keyboard.init(); 
});

