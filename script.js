
let second = document.querySelector(".second");
let min = document.querySelector(".min");
let hour = document.querySelector(".hour");
let clear = document.querySelector(".clear");
let start = document.querySelector(".start");

let secondInner = Number(second.innerHTML);
let minInner = Number(min.innerHTML);
let hourInner = Number(hour.innerHTML);

document.addEventListener('DOMContentLoaded', (event) => {
    let intervalSecond;

    start.addEventListener("click", function () {
        intervalSecond = setInterval(counter, 1000);

        const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 1500,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.onmouseenter = Swal.stopTimer;
                toast.onmouseleave = Swal.resumeTimer;
            }
        });
        Toast.fire({
            icon: "success",
            title: "Your Timer Started"
        });
    })

    function counter() {
        secondInner += 1;
        if (secondInner === 60) {
            secondInner = 0;
            minInner += 1;
            if (minInner === 60) {
                minInner = 0;
                hourInner += 1;
            }
        }
        second.innerHTML = String(secondInner).padStart(2, '0');
        min.innerHTML = String(minInner).padStart(2, '0');
        hour.innerHTML = String(hourInner).padStart(2, '0');
    }

    clear.addEventListener("click", () => {
        clearInterval(intervalSecond);
        second.innerHTML = "00";
        min.innerHTML = "00";
        hour.innerHTML = "00";
        secondInner = 0;
        minInner = 0;
        hourInner = 0;

        let timerInterval;
        Swal.fire({
            title: "Your Timer Cleaered",
            html: "We will close in <b></b> milliseconds.",
            timer: 2000,
            timerProgressBar: true,
            didOpen: () => {
                Swal.showLoading();
                const timer = Swal.getPopup().querySelector("b");
                timerInterval = setInterval(() => {
                    timer.textContent = `${Swal.getTimerLeft()}`;
                }, 100);
            },
            willClose: () => {
                clearInterval(timerInterval);
            }
        })
    });
});
