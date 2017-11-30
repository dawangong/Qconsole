(function (window) {
    function Consoles() {
        this.init();//初始化
    }

    Consoles.prototype.init = function () {
        this.drawingHtml();//创造绘制render tree
        this.changeMethod();//浅层次修改console下的方法
        this.bindEvent();   //绑定主体事件
    };

    Consoles.prototype.drawingHtml = function () {
        this.prepareEls();  //创建绘制dom树
        this.settingEls(); //创建绘制css规则树
    };

    Consoles.prototype.changeMethod = function () {
        this.batchChangeConsole(); //批量浅层次修改console对象下的方法
    };

    Consoles.prototype.bindEvent = function () {
        this.consoles.addEventListener('click', () => {
            this.settingProperty(this.ohide, {display: 'block'});
            this.settingProperty(this.clear, {display: 'block'});
            this.settingProperty(this.consoles, {display: 'none'});
            this.settingProperty(this.content, {display: 'block'});
        }, false);
        this.ohide.addEventListener('click', () => {
            this.settingProperty(this.ohide, {display: 'none'});
            this.settingProperty(this.clear, {display: 'none'});
            this.settingProperty(this.consoles, {display: 'block'});
            this.settingProperty(this.content, {display: 'none'});
        }, false);
        this.clear.addEventListener('click', () => {
            this.clearPrintf();
        }, false)
    };

    Consoles.prototype.clearPrintf = function () {
        this.pss = this.contain.getElementsByTagName('p');
        this.removePss();
    };

    Consoles.prototype.removePss=function () {
        while (this.pss.length > 0) {
            this.pss[0].parentNode.removeChild(this.pss[0]);
        }
    };

    //主体区域1

    Consoles.prototype.prepareEls = function () {
        this.contain = this.createEls('div');
        this.contain.className = 'contain_Consoles';
        this.consoles = this.createEls('div');
        this.clear = this.createEls('div');
        this.ohide = this.createEls('div');
        this.content = this.createEls('div');
        this.body = document.getElementsByTagName('body')[0];
        this.insert([this.consoles, this.clear, this.ohide, this.content]);
        this.body.appendChild(this.contain);
    };

    Consoles.prototype.createEls = function (eles) {
        return document.createElement(eles);
    };

    Consoles.prototype.insert = function (arr) {
        for (let i = 0; i < arr.length; i++) {
            this.contain.appendChild(arr[i]);
        }
    };

    Consoles.prototype.settingEls = function () {
        this.settingProperty(this.consoles, {
            height: '30px',
            lineHeight: '30px',
            color: 'white',
            textAlign: 'center',
            background: '#04BE02',
            position: 'fixed',
            right: '15px',
            bottom: '10px',
            padding: '0px 15px',
            boxShadow: '1px 1px 3px black',
            cursor: 'pointer',
            borderRadius: '4px'
        });
        this.consoles.innerHTML = 'Console';
        this.settingProperty(this.clear, {
            width: '50%',
            height: '40px',
            lineHeight: '40px',
            border: '1px solid #EEEEEE',
            position: 'fixed',
            left: '0',
            bottom: '0',
            textAlign: 'center',
            cursor: 'pointer',
            display: 'none'
        });
        this.clear.innerHTML = 'Clear';
        this.settingProperty(this.ohide, {
            width: '50%',
            height: '40px',
            lineHeight: '40px',
            border: '1px solid #EEEEEE',
            position: 'fixed',
            right: '0',
            bottom: '0',
            textAlign: 'center',
            cursor: 'pointer',
            borderLeft: '0',
            display: 'none'
        });
        this.ohide.innerHTML = 'Hide';
        this.settingProperty(this.content, {
            width: '100%',
            position: 'fixed',
            left: '0',
            bottom: '42px',
            height: '200px',
            overflow: 'auto',
            display: 'none'
        });
        this.settingProperty(this.body, {margin: '0', padding: '0'});
    };

    Consoles.prototype.settingProperty = function (obj, cssp) {
        for (let x in cssp) {
            obj.style[x] = cssp[x];
        }
    };

    //主体区域2

    Consoles.prototype.batchChangeConsole = function () {
        this.pjArr = ['log', 'info', 'error', 'debug', 'warn'];
        let that = this;
        for (let i = 0; i < this.pjArr.length; i++) {
            console[this.pjArr[i]] = (function (temp) {
                return function (str) {
                    that.changeConsole(str, temp);
                }
            })(this.pjArr[i]);
        }
    };

    Consoles.prototype.changeConsole = function (str, obj) {
        this.ps = this.createEls('p');
        this.ps.innerHTML = str;
        this.settingProperty(this.ps, {
            borderTop: '1px solid #D2D3D7',
            lineHeight: '25px',
            height: '25px',
            margin: '0',
            cursor: 'text'
        });
        this.content.appendChild(this.ps);
        switch (obj) {
            case 'log':
                this.otherEvent('log');
                break;
            case 'debug':
                this.otherEvent('debug');
                break;
            case 'info':
                this.otherEvent('info');
                break;
            case 'warn':
                this.otherEvent('warn');
                break;
            case 'error':
                this.otherEvent('error');
                break;
        }
    };


    Consoles.prototype.otherEvent = function (str) {
        switch (str) {
            case 'log':
                this.selectExecute('#EFEFEF');
                break;
            case 'debug':
                this.selectExecute('#defef7');
                break;
            case 'info':
                this.selectExecute('#a8c1fe');
                break;
            case 'warn':
                this.selectExecute('#FEC451');
                break;
            case 'error':
                this.selectExecute('#FD4638');
                break;
        }
    };

    Consoles.prototype.selectExecute = function (color) {
        this.ps.addEventListener('mouseover', function () {
            this.style.background = color;
        }, false);
        this.ps.addEventListener('mouseout', function () {
            this.style.background = '';
        }, false);
    };

    window.Consoles = Consoles;

})(window);

