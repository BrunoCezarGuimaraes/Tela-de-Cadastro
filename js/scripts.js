class Validator{
	constructor(){
		this.validations = [
		'data-required',
		'data-min-length',
		'data-max-length',
		'data-email-validate',
		'data-only-letters',
		'data-equal',
		'data-password-validate',
		]
	}

	/*Iniciar a validação de todos os campos*/
	validate(form){
    
    /*Resgata todas as validações*/
    let currentValidations = document.querySelectorAll('form .error-validation');
    if(currentValidations.length){
    	this.cleanValidations(currentValidations);
    }

	/*Pegar inputs*/
	let inputs = form.getElementsByTagName('input');

	/*HTMLColletction -> Array*/
	let inputsArray = [...inputs];
    
    /*Loop nos inputs e validações mediante ao que for encontrado*/
    inputsArray.forEach(function(input, obj){
    	
    	/*Loop das validações*/
    	for(let i = 0; this.validations.length > i; i++){
    		/*Verifica se a validação atual existe no input*/
    		if(input.getAttribute(this.validations[i]) != null){
    			/*data-min-length -> minlength | limpado a string para virar um método*/
                let method = this.validations[i].replace("data-", "").replace("-", "");

    			/*Valor do input*/
    			let value = input.getAttribute(this.validations[i])

    			/*Invocar o método*/
    			this[method](input, value);
    		}
    	}

       }, this);

	}
    
    /*Verificação de caracteres mínimos*/
    minlength(input, minValue) {
        let inputLength = input.value.length;
        let errorMessage = `Precisa ter pelo menos ${minValue} caracteres`;

    if(inputLength < minValue) {
      this.printMessage(input, errorMessage);
    }

  }
    
    /*Verificação, se passou do limite dos caracteres*/
    maxlength(input, maxValue){
		let inputLength = input.value.length;
		let errorMessage = `Precisa ter menos que ${maxValue} caracteres`;

		if(inputLength > maxValue){
			this.printMessage(input, errorMessage);
		}

    }

    /*Validar se o campo tem apenas letras*/
    onlyletters(input){
    	let re = /^[A-Za-z]+$/;
    	let inputValue = input.value;
    	let errorMessage = `Este campo não aceita números ou caracters especiais`;

    	if(!re.test(inputValue)){
    		this.printMessage(input, errorMessage);
    	}

    }

    /*Validar Emails*/
    emailvalidate(input){
    	/*Validação basica*/
    	let re = /\S+@\S+\.\S+/;
    	let email = input.value;
    	let errorMessage = `Insira um e-mail no padrão @email.com`;

    	if(!re.test(email)){
    		this.printMessage(input, errorMessage);
    	}

    }

	/*Verificar se o input é requerido*/
	required(input){
		let inputValue = input.value;

		if(inputValue === ''){
			let errorMessage = `Este campo é obrigatorio`;

			this.printMessage(input, errorMessage);
		}

	}

	/*Verifica se os dois campos (senha e confirmação de senha) são iguais*/
	equal(input, inputName){
		let inputToCompare = document.getElementsByName(inputName)[0];
		let errorMessage = `Este campo precisa estar igual ao ${inputName}`;

		if(input.value != inputToCompare.value) {
			this.printMessage(input, errorMessage);
		}
	}

	/*Validar o campo de senha*/
	passwordvalidate(input){
		/*trasformar string em array*/
		let charArr = input.value.split("");

		let uppercases = 0;
		let numbers = 0;

		for(let i = 0; charArr.length > i; i++){
			if(charArr[i] === charArr[i].toUpperCase() && isNaN(parseInt(charArr[i]))){
				uppercases++;

			}else if(!isNaN(parseInt(charArr[i]))){
				numbers++;

			}
		}
		if(uppercases === 0 || numbers === 0){
			let errorMessage = `A Senha precisa de um caractere maiúsculo e um número`;

			this.printMessage(input, errorMessage);
		}
	}


	/*Imprime mensagem de erro na tela*/
	printMessage(input,msg){

        /*Quantidade de erros*/
        let errorsQty = input.parentNode.querySelector('.error-validation');
        if(errorsQty === null){
		 let template = document.querySelector('.error-validation').cloneNode(true);
		 template.textContent = msg;
		 let inputParent = input.parentNode;
		 template.classList.remove('template');
		 inputParent.appendChild(template);

	    }

	}
    
    /*limpar validações*/
	cleanValidations(validations){
		validations.forEach(el => el.remove());

	}

}

let form = document.getElementById("register-form");
let submit = document.getElementById("btn-submit");

let validator = new Validator();

/*Evento das validações*/
submit.addEventListener('click',function(e){
	e.preventDefault();
    
    validator.validate(form);

});