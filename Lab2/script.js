window.onload = function(){ 

    let a = ''
    let b = ''
    let expressionResult = ''
    let selectedOperation = null
    let theme = 0
    let theme_alt = 0
    let channel_capacity = 1000

    body = document.getElementById("body")
    equals_but = document.getElementById("btn_op_equal")
    
    // окно вывода результата
    outputElement = document.getElementById("result")
    
    // список объектов кнопок циферблата (id которых начинается с btn_digit_)
    digitButtons = document.querySelectorAll('[id ^= "btn_digit_"]')
    
    function onDigitButtonClicked(digit) {
        if (!selectedOperation) {
            if ((digit != '.') || (digit == '.' && !a.includes(digit))) { 
                a += digit
                outputElement.innerHTML = a
            }
        } else {
            if ((digit != '.') || (digit == '.' && !b.includes(digit))) { 
                b += digit
                outputElement.innerHTML = b        
            }
        }
    }
    
    // устанавка колбек-функций на кнопки циферблата по событию нажатия
    digitButtons.forEach(button => {
        button.onclick = function() {
            const digitValue = button.innerHTML
            onDigitButtonClicked(digitValue)
        }
    });

    document.getElementById("btn_op_sign").onclick = function(){
        if (!selectedOperation) {
            a = (-a).toString()
            outputElement.innerHTML = a
        } else {
            b = (-b).toString()
            outputElement.innerHTML = b
        }
    }

    document.getElementById("btn_op_back").onclick = function(){
        if (!selectedOperation) {
            if(a!=""){
                a = a.slice(0, -1)
                if(a!="" && a!="-") outputElement.innerHTML = a
                else {
                    a = ""
                    outputElement.innerHTML = 0
                }
            }
        } else {
            if(b!=""){
                b = b.slice(0, -1)
                if(b!="" && b!="-") outputElement.innerHTML = b    
                else {
                    b = ""
                    outputElement.innerHTML = 0
                }
            }
        }
    }

    document.getElementById("btn_change").onclick = function(){
        if(theme==0){
            body.style.background = "#4e0000"
            body.style.color = "#4e0000"
            theme = 1
        }
        else {
            body.style.background = "#222222"
            body.style.color = "#222222"
            theme = 0
        }
    }

    document.getElementById("btn_change_res").onclick = function(){
        if(theme_alt==0){
            outputElement.style.background = "#1b2335"
            outputElement.style.color = "#f8f9fa"
            theme_alt = 1
        }
        else {
            outputElement.style.background = "#8ac294"
            outputElement.style.color = "#1b3888"
            theme_alt = 0
        }
    }

    document.getElementById("btn_op_sqrt").onclick = function(){
        a = (Math.sqrt(a)).toString()
        outputElement.innerHTML = a
    }

    document.getElementById("btn_op_sqr").onclick = function(){
        a = (a*a).toString()
        outputElement.innerHTML = a
    }

    function fact(n){
        if(n == 0) return 1
        else return n*fact(n-1)
    }

    document.getElementById("btn_op_fact").onclick = function(){
        a = (fact(a)).toString()
        outputElement.innerHTML = a
    }
    
    // установка колбек-функций для кнопок операций
    document.getElementById("btn_op_mult").onclick = function() { 
        if (a === '') return
        selectedOperation = 'x'
    }
    document.getElementById("btn_op_plus").onclick = function() { 
        if (a === '') return
        if(b!=="" && selectedOperation == '+'){
            a = ((+a)+(+b)).toString()
            b = ''
        }
        selectedOperation = '+'
    }
    document.getElementById("btn_op_minus").onclick = function() { 
        if (a === '') return
        if(b!=="" && selectedOperation == '-'){
            a = ((+a)-(+b)).toString()
            b = ''
        }
        selectedOperation = '-'
    }
    document.getElementById("btn_op_div").onclick = function() { 
        if (a === '') return
        selectedOperation = '/'
    }
    document.getElementById("btn_op_percent").onclick = function () {
        if (a !== '' && !selectedOperation) {
            a =  (a/ 100).toString();
            outputElement.innerHTML = a;
        }
    };

    document.getElementById("btn_get_size").onclick = function(){
        if (a !== '' && !selectedOperation) {
            package_size = parseFloat(a);
            outputElement.innerHTML = 0;
            a = '';
        }
    };

    document.getElementById("btn_delay").onclick = function(){
        if (channel_capacity && package_size) {
 
            const channel_delay = ( (package_size * 8) / channel_capacity );
            
            outputElement.innerHTML = `
                f = ${channel_delay.toFixed(5)} с.<br>
                <span class="small-font">При пропуской способности 1000 мбит/c</span>

            `;
        }
    };


    // кнопка очищения
    document.getElementById("btn_op_clear").onclick = function() { 
        a = ''
        b = ''
        selectedOperation = ''
        expressionResult = ''
        outputElement.innerHTML = 0
    }
    
    // кнопка расчёта результата
    document.getElementById("btn_op_equal").onclick = function() { 
        if (a === '' || b === '' || !selectedOperation)
            return
            
        switch(selectedOperation) { 
            case 'x':
                expressionResult = (+a) * (+b)
                break;
            case '+':
                expressionResult = (+a) + (+b)
                break;
            case '-':
                expressionResult = (+a) - (+b)
                break;
            case '/':
                expressionResult = (+a) / (+b)
                break;
            case '%':
                expressionResult = (+a)/(+b)*100
                break;
        }
        
        a = expressionResult.toString()
        b = ''
        selectedOperation = null
    
        outputElement.innerHTML = a
    }
    };
