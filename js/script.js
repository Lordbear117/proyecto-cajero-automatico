
let usuario, contrasena, sld;

let Login         = document.getElementById("Login");
let Cajero        = document.getElementById("Cajero");

let cmbCuenta     = document.getElementById("cbCuentas");
let tbUser        = document.getElementById('tbUser');
let tbPassword    = document.getElementById('tbPassword');

let errorUser     = document.getElementById('errorUser');
let errorPassword = document.getElementById('errorPassword');
let errorCuenta   = document.getElementById('errorCuenta');

let tbSaldo       = document.getElementById('tbSaldo');
let tbMonto       = document.getElementById('tbMonto');

let btnDepositar  = document.getElementById('btnDepositar');
let btnDisponer   = document.getElementById('btnDisponer');
let btnLogOut     = document.getElementById("btnLogOut");

let alert         = document.getElementById("alert");

let textoBienvenida = document.getElementById("textoBienvenida");



document.getElementById("tbPassword").addEventListener("keypress", function(evt) {
  if (evt.which < 48 || evt.which > 57) {
    evt.preventDefault();
  }
});

function fLimpiarLogin () {
    cmbCuenta.value  = "";
    tbUser.value     = "";
    tbPassword.value = "";
}

function fValidarRetiro() {
    
    let saldoRestante = Number(tbSaldo.value) - (Number(tbMonto.value));
    
    if ( saldoRestante < 10) {
        return false
    } else {
        return true;
    } 
}

function fValidarDeposito() {
    
    let depositoExceso = Number(tbSaldo.value) + (Number(tbMonto.value));
    
    if ( depositoExceso > 990) {
        return false
    } else {
        return true;
    } 
}

const showErrors = (error) => {
    if (error === 'datos') {
        alert.classList.remove('hide');
        alert.innerHTML = '<h4 class="alert-heading">Faltan datos</h4> <p>Tanto usuario como contrase&ntilde;a son obligatorios</p>'
        
        setTimeout(() => {
            alert.classList.add('hide');
        }, 3000);
    
    } else if (error === 'cuenta') {
        errorCuenta.classList.remove('hide');
        errorCuenta.classList.add('show');
        
        cmbCuenta.classList.add('is-invalid');

        setTimeout(() => {
            errorCuenta.classList.remove('show');
            errorCuenta.classList.add('hide');

            cmbCuenta.classList.remove('is-invalid');
        }, 3000);

    }
    else if (error === 'user') {
        errorUser.classList.remove('hide');
        errorUser.classList.add('show');
        
        tbUser.classList.add('is-invalid');

        setTimeout(() => {
            errorUser.classList.remove('show');
            errorUser.classList.add('hide');

            tbUser.classList.remove('is-invalid');
        }, 3000);

    } else if (error === 'password') {
        errorPassword.classList.remove('hide');
        errorPassword.classList.add('show');
        
        tbPassword.classList.add('is-invalid');

        setTimeout(() => {
            errorPassword.classList.remove('show');
            errorPassword.classList.add('hide');

            tbPassword.classList.remove('is-invalid');
        }, 3000);

    }  else if (error ==='retiroMayor') {
        alert.classList.remove('hide');
        alert.innerHTML = '<h4 class="alert-heading">Retiro mayor al permitido</h4> <p>Tu cuenta al menos debe de tener 10 pesos</p>'
        
        setTimeout(() => {
            alert.classList.add('hide');
        }, 3000);
    }

    else if (error ==='depositoMayor') {
        alert.classList.remove('hide');
        alert.innerHTML = '<h4 class="alert-heading">Deposito mayor al permitido</h4> <p>Tu cuenta no puede tener mas de 990 pesos</p>'
        
        setTimeout(() => {
            alert.classList.add('hide');
        }, 3000);
    }

}

cmbCuenta.addEventListener("change", function() {

    switch (cmbCuenta.value) {
        case 'c1':

            usuario     = cuentas.c1.usuario;
            contrasena  = cuentas.c1.contra;
            sld         = cuentas.c1.saldo;

            break;
        case 'c2':

            usuario     = cuentas.c2.usuario;
            contrasena  = cuentas.c2.contra;
            sld         = cuentas.c2.saldo;

            break;
        case 'c3':

            usuario     = cuentas.c3.usuario;
            contrasena  = cuentas.c3.contra;
            sld         = cuentas.c3.saldo;

            break;
    }

    tbUser.value = '';
    tbPassword.value = '';

});

const validarLogin = (user, password) => {
    if (cmbCuenta.value === '') {
        showErrors('cuenta')
    } else if (user == '' || password == '') {
        showErrors('datos')
    } else if (user !== usuario) {
        showErrors('user');

    } else if (password !== contrasena) {
        showErrors('password');
    } else {

        Login.classList.remove('show');
        Login.classList.add('hide');

        Cajero.classList.remove('hide');
        Cajero.classList.add('show');

        btnLogOut.classList.remove('hide');

        textoBienvenida.textContent = `Bienvenido ${usuario}, realiza tus operaciones`;

        tbSaldo.value = `${sld}`;
        tbMonto.value = '';
    }
}


frmLogin.addEventListener('submit', (evento) => {
    evento.preventDefault();

    validarLogin(tbUser.value.toUpperCase(), tbPassword.value.toUpperCase())
});



btnDepositar.addEventListener('click', (evento) => {
    evento.preventDefault();

    let nvoMonto = 0;

    if (tbMonto.value != '' && Number(tbMonto.value) > 0) {

        if (!fValidarDeposito()) {
            
            showErrors('depositoMayor');
            tbMonto.value = '';

        } else {

            switch (cmbCuenta.value) {
                case 'c1':

                    nvoMonto = Number(cuentas.c1.saldo) + Number(tbMonto.value);

                    cuentas.c1.saldo = nvoMonto;

                    break;

                case 'c2':

                    nvoMonto = Number(cuentas.c2.saldo) + Number(tbMonto.value);

                    cuentas.c2.saldo = nvoMonto;

                    break;

                case 'c3':

                    nvoMonto = Number(cuentas.c3.saldo) + Number(tbMonto.value);

                    cuentas.c3.saldo = nvoMonto;

                    break;
            }

            tbSaldo.value = `${nvoMonto}`;
            tbMonto.value = '';

        }
    }

})

btnDisponer.addEventListener('click', (evento) => {
    evento.preventDefault();

    let nvoMonto = 0;

    if (tbMonto.value != '' && tbMonto.value > 0) {

        if (Number(tbMonto.value) > Number(tbSaldo.value)) {

            errorMonto.classList.remove('hide');
            errorMonto.classList.add('show');

            tbMonto.classList.add('is-invalid');

            tbMonto.value = '';

            setTimeout(() => {
                errorMonto.classList.remove('show');
                errorMonto.classList.add('hide');

                tbMonto.classList.remove('is-invalid');
            }, 3000);

        }
        else if (!fValidarRetiro()) {

            showErrors('retiroMayor');
            tbMonto.value = '';
        }
        else {

            switch (cmbCuenta.value) {
                case 'c1':

                    nvoMonto = Number(cuentas.c1.saldo) - Number(tbMonto.value);

                    cuentas.c1.saldo = nvoMonto;

                    break;

                case 'c2':

                    nvoMonto = Number(cuentas.c2.saldo) - Number(tbMonto.value);

                    cuentas.c2.saldo = nvoMonto;

                    break;

                case 'c3':

                    nvoMonto = Number(cuentas.c3.saldo) - Number(tbMonto.value);

                    cuentas.c3.saldo = nvoMonto;

                    break;
            }

            tbSaldo.value = `${nvoMonto}`;
            tbMonto.value = '';
        }
    }

});

btnLogOut.addEventListener("click", function () {
    Login.classList.remove('hide');
    Login.classList.add('show');

    Cajero.classList.remove('show');
    Cajero.classList.add('hide');

    btnLogOut.classList.add('hide');

    fLimpiarLogin();
});
