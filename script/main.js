const fileInput = document.querySelector(".parse-form__input");
const btnAttach = document.querySelector(".parse-form__button-attach");
const btnThrow = document.querySelector(".parse-form__button-throw");
const parseForm = document.querySelector(".parse-form__final");
const btnDelete = document.querySelector(".delete");


btnAttach.addEventListener('click', (e) => { 
    const file = fileInput.files[0];
    if (file === undefined) { 
        alert("Файл не выбран");
        return;
    }
    const fileName = file.name;
    const fileExtension =  fileName.split('.').pop();
    if (fileExtension === 'js' || fileExtension === 'json') {
        const read = new FileReader();
        read.onload = function (event) { 
            console.log("Файл прочитан")
            const content = event.target.result;

            try {
                const jsonContent = JSON.parse(content);

                if (jsonContent.fields) { 
                    const name = document.createElement('h2');
                    name.textContent = jsonContent.name;
                    parseForm.appendChild(name);
                }

                if (jsonContent.fields) { 
                    jsonContent.fields.forEach((element, index) => {

                        const inputPars = document.createElement('input');
                        const parseLabel = document.createElement('label');
                        
                        parseLabel.textContent = element.label;
                            

                        Object.keys(element.input).forEach(key => { 
                            inputPars.setAttribute(key, element.input[key]);

                            if (inputPars.type === "color") { 
                                console.log('Ну тут типо текст');
                                const datalist = document.createElement('datalist');
                                const datalistId = "color";

                                datalist.id = datalistId;

                                const color = element.input.colors;

                                if (element.input.colors) { 
                                    color.forEach(color => { 
                                        const option = document.createElement('option');
                                        option.value = color;
                                        datalist.appendChild(option);
                                    })
                                }
                                
                                parseForm.appendChild(datalist);
                                inputPars.setAttribute('list', datalistId);
                                
                            }
                        })

                        parseForm.appendChild(parseLabel);
                        parseForm.appendChild(inputPars);
                    });
                }
                
                if (jsonContent.buttons) { 
                    jsonContent.buttons.forEach(element => {
                        const parseBtn = document.createElement('button');
                        parseBtn.textContent = element.text; 
                        parseForm.appendChild(parseBtn);
                    });
                }

                if (jsonContent.references) { 
                    jsonContent.references.forEach(element => { 
                        const parseReferences = document.createElement('a');
                        parseReferences.textContent = element.text;
                        parseReferences.setAttribute('href', element.ref);
                        parseForm.appendChild(parseReferences);
                    })
                }
            }
            catch (e) { 
                alert(" Непонятный json");
            }
            
            
        }
        read.readAsText(file);
    } else { 
        alert("неверный тип файла");
    }
})

btnThrow.addEventListener('click', (e) => { 
    fileInput.value = "";
})

btnDelete.addEventListener('click', (e) => { 
    parseForm.remove();
})