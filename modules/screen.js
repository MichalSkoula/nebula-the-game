export const name = 'screen';

export function resize() {
    function resizeCanvas() {
        
        let canvas = document.getElementById('canvas');
        let nav = document.getElementById('nav');
        let header = document.getElementById('header');

        if (window.innerWidth / window.innerHeight < 1.78) {
            //console.log("příliš vysoké");

            canvas.style.width = nav.style.width = header.style.width = '100vw';

            canvas.style.height = '44vw';
            nav.style.height = '10vw';
            header.style.height = '2vw';
        } else {
            //console.log("příliš široké");

            canvas.style.width = nav.style.width = header.style.width = '178vh';

            canvas.style.height = '100vh';
            nav.style.height = '10vw';
            header.style.height = '2vw';
        }
    }

    window.onresize = function(event) {
        resizeCanvas();
    };

    resizeCanvas();
}
