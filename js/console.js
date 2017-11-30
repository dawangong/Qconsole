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
            this.controlStatus(true);
        }, false);
        this.ohide.addEventListener('click', () => {
            this.controlStatus(false);
        }, false);
        this.clear.addEventListener('click', () => {
            this.clearPrintf();
        }, false)
    };

    //主体区域1(绘制render tree相关方法)

    Consoles.prototype.prepareEls = function () {
        this.controlArr = ['contain', 'consoles', 'clear', 'ohide', 'content'];
        for (let i = 0; i < this.controlArr.length; i++) {
            this[this.controlArr[i]] = this.createEls('div');
        }
        this.contain.className = 'contain_Consoles';
        this.body = document.getElementsByTagName('body')[0];
        this.insert([this.consoles, this.clear, this.ohide, this.content]);
        this.body.appendChild(this.contain);
    };

    Consoles.prototype.createEls = function (obj, eles) {
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

    //主体区域2(修改console下的方法并配色相关方法)

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
        this.otherEvent(obj);
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

    //主体区域3（绑定主体事件的相关方法）

    Consoles.prototype.controlStatus = function (status) {
        let stateArr = [this.ohide, this.clear, this.content, this.consoles];
        this.decideStatus(status);
        for (let i = 0; i < stateArr.length; i++) {
            if (stateArr[i] == this.consoles) {
                status = !status;
                this.decideStatus(status);
            }
            this.settingProperty(stateArr[i], {display: this.temp});
        }
    };

    Consoles.prototype.decideStatus = function (status) {
        if (status == true) {
            this.temp = 'block';
        }
        else {
            this.temp = 'none';
        }
    };

    Consoles.prototype.clearPrintf = function () {
        this.pss = this.contain.getElementsByTagName('p');
        this.removePss();
    };

    Consoles.prototype.removePss = function () {
        while (this.pss.length > 0) {
            this.pss[0].parentNode.removeChild(this.pss[0]);
        }
    };

    window.Consoles = Consoles;
})(window);

