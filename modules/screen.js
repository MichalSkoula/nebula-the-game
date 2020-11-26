export const name = 'screen';

export function resize() {
    function resizeCanvas() {
        if (window.innerWidth / window.innerHeight < 1.78) {
            //console.log("příliš vysoké");
            // standard
            document.getElementById('canvas').style.width = '100vw';
            document.getElementById('canvas').style.height = '56vw';
        } else {
            //console.log("příliš široké");
            // change
            document.getElementById('canvas').style.width = '178vh';
            document.getElementById('canvas').style.height = '100vh';
        }
    }

    window.onresize = function(event) {
        resizeCanvas();
    };
    resizeCanvas();
}
