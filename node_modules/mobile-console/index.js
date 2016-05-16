/**
 * Created by dormi on 11.05.2016.
 */
(function () {
    require('./index.css');
    var options = {
        width: '350',
        height: '200'
    };
    var componentContainer;
    var consoleComponent;
    var closeButton;
    var consoleHolder;
    var isExpended = true;
    var beforeDomReadyQueue = [];
    var oldOnError = window.onerror;

    function mobileConsole() {}

    window.mobileConsole = mobileConsole;

    mobileConsole.prototype.init = mobileConsole.init = function () {
        initEventListeners();
        if (document.readyState === "complete") {
            initUI();
        }

        consoleHolder = window.console;
        window.console = customConsole;
        initErrorListener();
    };

    mobileConsole.prototype.dispose = mobileConsole.dispose = function () {
        removeListeners();
        document.body.removeChild(componentContainer);
        window.console = consoleHolder;
    };

    function initDOMEventListeners() {
        closeButton.addEventListener('click', toggleMinimize);
    }

    function initEventListeners() {
        window.addEventListener('load', onDOMLoaded);
    }

    function removeListeners() {
        window.removeEventListener('load', onDOMLoaded);
        window.onerror = oldOnError;
    }

    function onDOMLoaded() {
        initUI();
        for (var i = 0, l = beforeDomReadyQueue.length; i < l; i++) {
            var msgElement = beforeDomReadyQueue[i];
            console[msgElement.type](msgElement.msg);
        }
    }

    function initUI() {
        if (!componentContainer) {
            componentContainer = createComponentContainer();
            closeButton = createCloseButton();
            consoleComponent = createConsoleContainer();
            componentContainer.appendChild(consoleComponent);
            componentContainer.appendChild(closeButton);
            document.body.insertBefore(componentContainer, document.body.firstChild);
            initDOMEventListeners();
        }
    }

    function createComponentContainer() {
        var element = document.createElement('div');
        element.className = 'mc-container';
        element.style.cssText =
            'width:' + options.width + 'px;' +
            'height:' + options.height + 'px;';
        return element;
    }

    function createConsoleContainer() {
        var element = document.createElement('div');
        element.className = 'mc-console';
        return element;
    }

    function createCloseButton() {
        var button = document.createElement('div');
        button.className = 'mc-close-button';
        return button;
    }

    function toggleMinimize() {
        isExpended = !isExpended;
        if (isExpended) {
            consoleComponent.style.display = 'block';
            componentContainer.style.width = options.width + 'px';
            closeButton.className = 'mc-close-button';
        } else {
            consoleComponent.style.display = 'none';
            componentContainer.style.width = '0';
            closeButton.className += ' mc-minimized';
        }
    }

    function createConsoleMessage(msg, type) {
        var consoleMessageElement = document.createElement('span');
        consoleMessageElement.className = 'mc-message-' + type;
        consoleMessageElement.innerHTML += msg;
        return consoleMessageElement;
    }

    function scrollBottom(el) {
        el.scrollTop = el.scrollHeight;
    }

    function addToQueue(msg, type) {
        beforeDomReadyQueue.push({
            msg: msg,
            type: type
        });
    }

    function customConsole() {
    }

    customConsole.log = function (msg) {
        this.message(msg, 'log');
    };

    customConsole.warn = function (msg) {
        this.message(msg, 'warn');
    };

    customConsole.error = function (msg) {
        this.message(msg, 'error');
    };

    function initErrorListener() {
        window.onerror = function (msg, url, line) {
            if (oldOnError)
                oldOnError(msg, url, line);
            console.error(msg);
        };
    }

    customConsole.message = function (msg, type) {
        if (document.readyState !== 'complete') {
            addToQueue(msg, type);
            return;
        }
        consoleHolder[type](msg);
        consoleComponent.appendChild(createConsoleMessage(msg, type));
        scrollBottom(consoleComponent);
    };

    if (typeof define == 'function' && define.amd) {
        define('mobileConsole', [], function () {
            return mobileConsole;
        });
    }
}());