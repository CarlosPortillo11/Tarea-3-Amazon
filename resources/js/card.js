var stripeKey = 'pk_test_EdJlSPmqO0xEFAdt8HkGrdKb00l3XuP2ov';
var stripe = Stripe(stripeKey);
var elements = stripe.elements();
var card = elements.create('card', {
    style: {
        base: {
            color: 'black',
            fontSize: '20px',
            iconColor: 'black',
            borderStyle: 'solid',
            borderColor: 'gray',
        },
    },
    hidePostalCode: true,
});

card.mount('#card-element');

card.on('focus', () => {
    console.log('user is in form');
});

card.addEventListener('change', function (event) {
    var errors = document.getElementById('errors');

    if (event.error) {
        document.getElementById('errors').style.display = "block";
        errors.textContent = event.error.message;
    } else {
        document.getElementById('errors').style.display = "none";
        errors.textContent = '';
    }
});

var form = document.querySelector('#card-form');

form.addEventListener('submit', (event) => {
    event.preventDefault();

    stripe
        .createToken(card)
        .then((result) => {
            if (result.error) {
                // Alertar al usuario que hubo un error
            } else {
                console.log(result.token.id);
                alert("El pago fue realizado con exito");
                window.location.href = "/done.html"
            }
        });
});