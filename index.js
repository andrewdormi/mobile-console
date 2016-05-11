/**
 * Created by dormi on 11.05.2016.
 */
(function () {
    var options = {
        errorColor: '#F44336',
        warnColor: '#FFEB3B',
        logColor: '#000000',
        backgroundColor: 'rgba(0,0,0,0.2)',
        width: '350',
        height: '200'
    };
    var componentContainer;
    var consoleComponent;
    var closeButton;
    var placeholder;
    var consoleHolder;

    var mobileConsole = function () {
    };

    window.mobileConsole = mobileConsole;

    mobileConsole.init = function () {
        componentContainer = createComponentContainer();
        closeButton = createCloseButton();
        consoleComponent = createConsoleContainer();
        componentContainer.appendChild(consoleComponent);
        componentContainer.appendChild(closeButton);
        initEventListeners();
        document.body.insertBefore(componentContainer, document.body.firstChild);

        consoleHolder = window.console;
        window.console = customConsole;
    };

    function initEventListeners() {
        closeButton.addEventListener('click', minimize);
    }

    function createComponentContainer(){
        var element = document.createElement('div');
        element.style.cssText =
            'position: absolute;' +
            'right: 0;' +
            'bottom: 0;' +
            'width:' + options.width + 'px;' +
            'height:' + options.height + 'px;' +
            'background-color:' + options.backgroundColor + ';';
        return element;
    }

    function createConsoleContainer() {
        var element = document.createElement('div');
        element.style.cssText =
            'width: 100%' +
            'height: 100%;' +
            'margin: 1em;';
        return element;
    }

    function createCloseButton() {
        var button = document.createElement('div');
        button.style.cssText =
            'position: absolute;' +
            'top: 0;' +
            'left: 0;' +
            'width: 1em;' +
            'background-image: url("' + minimizeIcon + '");' +
            'cursor: pointer;' +
            'height: 1em;';
        return button;
    }

    function minimize() {
        consoleComponent.style.display = 'none';
    }

    function createConsoleMessage(msg, type) {
        var color;
        switch (type) {
            case 'log':
                color = options.logColor;
                break;
            case 'warn':
                color = options.warnColor;
                break;
            case 'error':
                color = options.errorColor;
                break
        }
        var consoleMessageElement = document.createElement('p');
        consoleMessageElement.style.color = color;
        consoleMessageElement.style.margin = '0.2em';
        consoleMessageElement.innerText = msg;
        return consoleMessageElement;
    }

    function customConsole() {
    }

    customConsole.log = function (msg) {
        consoleHolder.log(msg);
        consoleComponent.appendChild(createConsoleMessage(msg, 'log'));
    };
    customConsole.warn = function (msg) {
        consoleHolder.warn(msg);
        consoleComponent.appendChild(createConsoleMessage(msg, 'warn'));
    };
    customConsole.error = function (msg) {
        consoleHolder.error(msg);
        consoleComponent.appendChild(createConsoleMessage(msg, 'error'));
    };

    var minimizeIcon = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAQCAYAAADJViUEAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAIGNIUk0AAHolAACAgwAA+f8AAIDoAABSCAABFVgAADqXAAAXb9daH5AAAAJESURBVHjanNJPSNNhHMfx93e/Z0sT2g/dwfaP6ZptbGyTlsb876aIjhWkh6I6BoEVLCWjhkJJSz1JeKyD2KFbh45dMtCDh/KkhwkGIZIUdujY02U/EftD9MDn8MDzeni+3++D1pr/DWtra2pxcbFtYWHhxuzs7LmpqSnGxsaYnn7IzMxjJieLTEyMMz5eoLOzg6amJrxeL9lsDwwPD/cA24AG3gMXAfx+N+3trZJOn7W1tbUYQ0N9YppOrNXcHIdCoTAHaBHRIqKBMnAlHo9JLjdAJtNVlc8PqnA4hFIKEZkDVhKJWJJisXgZ2LNwJR9N0zmaTrdWjYxcIB6PilIKoCgi34EfsVjkEqVS6RhQEJFdCyulNLDrdJ646/GcxOFwANwUkW+V1+lI5PQt5ufnrTJGgU9KGdrhcFgXfAbuVeDeodJ0OBy6z9LSEqbpxOfzUFdXex3YVkppm81mlfBVRL5Y0GazaUCHQsFHLC+/JZVKks8P0tGRtrtcrmsisnGkBwex2+0a0MFgwxNWV1dIJKKSyXQ5crkBo6XljAA5YO0oVEodYL/f95T19Q8kElHp7++19/Z2GW53PUAM2PwdVEpV9sZzNjc3SKWS0tfXLR6PGyAgIm/+Bit5ydZWmcbGAIGAH6AeePUPUAOvKZfL1qicwIvDBwzD+BPUpul8x87OjoW9lf/9Sw6N7QDX1Bx/xv7+Pi5XHW53fbXP57kTCPjngsGGUjgcehCNRm6Hw6GrwHkRyYpIGkhWV1edyma7a38OAFmh+KvA1cJGAAAAAElFTkSuQmCC';
})();