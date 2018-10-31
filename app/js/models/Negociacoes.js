class Negociacoes {
    constructor() {
        //private _negociacoes: Array<Negociacao> = [];      ou
        this._negociacoes = [];
    }
    adiciona(negociacao) {
        this._negociacoes.push(negociacao);
    }
    negociacoes() {
        return [].concat(this._negociacoes);
    }
}
