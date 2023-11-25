document.getElementById('form').addEventListener('submit', loadPreviousInputs);

function loadPreviousInputs(e) {
    //e.preventDefault();
    //var errors = new Array(); 
    let errors = [];
    const serial_number = document.getElementById('inputSerialNumber').value;
    const condition = document.getElementById('inputCondition').value;
    const name = document.getElementById('inputName').value;
    const mintaSerialNumber = /^[A-Z]{2}[0-9]{4}$/i;
    let hibaUzenetOsszesitve;
    
    if(!mintaSerialNumber.test(serial_number)) {
        errors.push('A serial number formátuma nem megfelelő!');
    }
    if(!(condition == 'perfect' || condition == 'damaged')) {
        errors.push('A termék állapotának "perfect"-nek vagy "damaged"-nek kell lennie.');
    }
    if(name.length < 3) {
        errors.push('A termék nevének hosszabbnak kell lennie mint 3 karakter.')
    }
    if(errors.length > 0) {
        for (let i = 0; i < errors.length; i++) {
            const element = errors[i];
            hibaUzenetOsszesitve += errors[i] + "";
        }
        document.getElementById('hibaUzenet').textContent = hibaUzenetOsszesitve;
        //return {
        //  errors,
        //};
        e.preventDefault();
    } else {
        errors = [];
        return {
            errors,
        };
    }
}