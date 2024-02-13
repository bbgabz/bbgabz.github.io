
// Combined JavaScript Code

// Animation Cards
let animation = document.querySelectorAll(".animation");

function showScroll() {
    let scrollTop = document.documentElement.scrollTop;
    for (let i = 0; i < animation.length; i++) {
        let heightAnimation = animation[i].offsetHeight;
        if (heightAnimation - -450 < scrollTop) {
            animation[i].style.opacity = 1;
            animation[i].classList.add("showUp");
        }
    }
}

window.addEventListener("scroll", showScroll);

// Animation Timeline
function qs(selector, all = false) {
    return all ? document.querySelectorAll(selector) : document.querySelector(selector);
}

const sections = qs(".time-line-description", true);
const timeline = qs(".timeline");
const line = qs(".line");

line.style.bottom = `calc(100% -20px)`;

let prevScrollY = window.scrollY;
let up, down;
let full = false;
let set = 0;
const targetY = window.innerHeight * 0.8;

function scrollHandler(e) {
    const { scrollY } = window;
    up = scrollY < prevScrollY;
    down = !up;
    const timelineRect = timeline.getBoundingClientRect();
    const lineRect = line.getBoundingClientRect();

    const dist = targetY - timelineRect.top;

    if (down && !full) {
        set = Math.max(set, dist);
        line.style.bottom = `calc(100% - ${set}px)`;
    }
    if (dist > timeline.offsetHeight + 50 && !full) {
        full = true;
        line.style.bottom = `-50px`;
    }

    sections.forEach((item) => {
        const rect = item.getBoundingClientRect();

        if (rect.top + item.offsetHeight / 5 < targetY) {
            item.classList.add("show-me");
        }
    });
    prevScrollY = window.scrollY;
}

scrollHandler();
line.style.display = "block";
window.addEventListener("scroll", scrollHandler);

// Form
const emailForm = document.getElementById('emailForm');

emailForm.addEventListener('submit', function (event) {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const name = document.getElementById('name').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;
    const body = 'name: ' + name + '<br/> email: ' + email + '<br/> subject' +
        subject + '<br/> message: ' + message;

    const emailSend = document.getElementById('btn');

    const spinner = document.createElement('div');
    spinner.classList.add('spinner');

    if (validateEmail(email) && name && subject && message) {
        emailForm.appendChild(spinner); // Show spinner

        // Simulate sending for 2 seconds (replace with actual sending logic)
        setTimeout(() => {

            const alertSuccess = document.createElement('p');
            alertSuccess.textContent = 'Message Successfully Sent';
            alertSuccess.classList.add('messageSent');
            emailForm.appendChild(alertSuccess); // Show success message

            //console.log('hi'); // Log 'hi' to console after success message is displayed
            //console.log replace this send e-mail

            const serviceID = "service_e13mq2c";
            const templateID = "template_jty5mzu";

            emailjs.send(serviceID, templateID, {
                name: name,
                email: email,
                subject: subject,
                message: message

            })

                .then(
                    res => {
                        document.getElementById("name").value = "";
                        document.getElementById("email").value = "";
                        document.getElementById("message").value = "";
                        console.log(res);
                    })


            // Hide success message after 5 seconds
            setTimeout(() => {
                emailForm.removeChild(alertSuccess);
            }, 3000);

            // Remove spinner and reset form after success message shown
            emailForm.removeChild(spinner);
            emailForm.reset();
        }, 2000);
    } else {
        alert('Please fill in all fields correctly.');
    }
});

function validateEmail(email) {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
}

// Mouse-about me

// Starfield Animation
