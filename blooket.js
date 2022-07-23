let kit = {};

kit._$krh = function _$kitreacthandler() {
    return Object.values(document.querySelector('#app > div > div'))[1].children[1]._owner;
}

function unalloc(name) {
    delete kit[name]
}

[kit.react, kit.hack, kit.handler, kit.reactHandler] = Array(4).fill(kit._$krh);
unalloc("_$krh");

kit.mode = () => location.pathname.split("/").at(-1);

kit.setAmount = (type, value) => {
    let values = {};
    [type, type + "2"].forEach(m => values[m] = value);
    kit.hack().stateNode.setState(values);
    kit.hack().alternate.stateNode.setState(values);
    return values
}


kit = {
    ...kit,
    ctype: () => Object.entries(kit.hack().stateNode.state).map(a=>"number"==typeof a[1]?a[0]:null).filter(a=>Object.entries(kit.hack().stateNode.state).map(a=>"number"==typeof a[1]?a[0]:null).includes(a)&&Object.entries(kit.hack().stateNode.state).map(a=>"number"==typeof a[1]?a[0]:null).includes(a+"2"))[0],
    data: {
        defaultDelay: 50,
        get: function(a) {
            return kit.hack()[a]?kit.hack()[a]:kit.hack().stateNode[a]?kit.hack().stateNode.state[a]:kit.hack().stateNode.state[a]?kit.hack().stateNode.state[a]:kit.hack().memoizedProps[a]?kit.hack().memoizedProps[a]:kit.hack().stateNode.props[a]?kit.hack().stateNode.props[a]:void 0;
        },
    }
}

let pregame = ["play", "lobby", "register", "instructions"]

const isingame = () => !pregame.includes(kit.mode()) 
const isingameorinst = () => !pregame.slice(0,3).includes(kit.mode())

function kit_waitStart() {
    return new Promise((res,rej) => {
        let iint = setInterval(() => {
            if (isingame() === true) res(true); clearInterval(iint)
        }, kit.defaultDelay)
    })
}

function kit_waitStartOrInst() {
    return new Promise((res,rej) => {
        let iint = setInterval(() => {
            if (isingameorinst() === true) res(true); clearInterval(iint)
        }, kit.defaultDelay)
    })
}

kit.getCorrectAnswer = function () {
    return kit.data.get("question").correctAnswers[0];
}

kit.setAllCorrect = () => {
    kit.hack().stateNode.state.question.correctAnswers = kit.data.get("question").answers
}

kit.answer = () => {
    kit.setAllCorrect();
    document.querySelectorAll("div[style='display: block;']")[1].click()
}
    
kit.elements = {};

kit.elements.check = () => document.querySelector("#app > div > div > div.styles__feedbackContainer___1fuws-camelCase > div > div.styles__container___1-bHf-camelCase");
kit.click = e => e.click();
kit.elements.midchest = () => document.querySelector("#app > div > div > div.arts__regularBody___1TM6E-camelCase > div:nth-child(2) > div.styles__choice2___1aP2D-camelCase");
kit.elements.advance = () => document.querySelector("#app");

function startHack(func) {
    setInterval(func, kit.defaultDelay)
}

var originalSetTimeout = setTimeout.bind(window);
kit.setDelay = (d=0) => setTimeout = function(f,t) { originalSetTimeout(f,d) }

