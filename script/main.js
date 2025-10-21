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
                console.log(jsonContent);

                jsonContent.fields.forEach(element => { 
                    const parseLabel = document.createElement('label');

                    Object.keys(element.label).forEach(key => { 
                        parseLabel.textContent = element.label;
                    })

                    parseForm.appendChild(parseLabel);
                })
                
                jsonContent.fields.forEach(element => {
                    
                    // добавление input
                    const inputPars = document.createElement('input');

                    Object.keys(element.input).forEach(key => { 
                        inputPars.setAttribute(key, element.input[key]);
                    })
                    parseForm.appendChild(inputPars);
                });

                jsonContent.buttons.forEach(element => { 

                    // добавление кнопок

                    const parseBtn = document.createElement('button');

                    Object.keys(element.text).forEach(key => { 
                        parseBtn.textContent = element.text;
                    })

                    parseForm.appendChild(parseBtn);
                })

                jsonContent.references.forEach(element => { 
                    const parseReferences = document.createElement('a');
                    parseReferences.textContent = element.text;
                    parseReferences.setAttribute('href', element.ref);
                    parseForm.appendChild(parseReferences);
                })


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