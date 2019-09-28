var arrElementToScale = new Array();

addElementToScale('.content',600,369,1)

function addElementToScale(element, width, height, scale) {
    element = document.querySelectorAll(element),
        elementCount = element.length;
  
    for (let i = 0; i < elementCount; i++) {
        let objElementInfo = {
            element: element[i],
            baseWidth: width,
            baseHeight: height,
            scale: scale,
            parent: element[i].parentElement,
            parentWidth: element[i].parentElement.offsetWidth,
            parentHeight: element[i].parentElement.offsetHeight
        }
        arrElementToScale.push(objElementInfo);
    }

}

function scaling() {

    scale();

    window.onresize = function (event) {
        scale();
    };

    function scale() {
        let elementCount = arrElementToScale.length;

        for (let i = 0; i < elementCount; i++) {
            objElement = arrElementToScale[i];

            getElementSize(objElement);
            scaleElement(objElement);

        }
    }

    function getElementSize(objElement) {
        objElement.parentWidth = objElement.parent.offsetWidth;
        objElement.parentHeight = objElement.parent.offsetHeight;
    }

    function scaleElement(objElement) {
        let scaleX = 1, scaleY = 1,
            newLeftPos, newTopPos;

        scaleX = objElement.parentWidth / objElement.baseWidth;
        scaleY = objElement.parentHeight / objElement.baseHeight;
        objElement.scaleX = scaleX;
        objElement.scaleY = scaleY;
        objElement.scale = (scaleX > scaleY ? scaleY : scaleX);

        newLeftPos = Math.abs(Math.floor(((objElement.baseWidth * objElement.scale) - objElement.parentWidth) / 2));
        newTopPos = Math.abs(Math.floor(((objElement.baseHeight * objElement.scale) - objElement.parentHeight) / 2));

        objElement.element.setAttribute('style', '-webkit-transform:scale(' + objElement.scale + ');left:' + newLeftPos + 'px;top:' + newTopPos + 'px;')
    }
}

scaling()