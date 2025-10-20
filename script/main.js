const fileInput = document.querySelector(".parse-form__input");
const btnAttach = document.querySelector(".parse-form__button-attach");
const btnThrow = document.querySelector(".parse-form__button-throw");
const parseForm = document.querySelector(".parse-form__final");


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
                const title = document.createElement('h2');
                title.textContent = "Файл работает у тебя";
                parseForm.appendChild(title);
                
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
