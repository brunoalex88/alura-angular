import {NegociacoesView, MensagemView} from "../views/index";
import {Negociacoes, Negociacao, NegociacaoParcial} from "../models/index";
import {domInject, throttle} from "../helpers/decorators/index";
import {NegociacaoService} from "../services/index";

export class NegociacaoController {
    @domInject("#data")
    private _inputData: JQuery;
    @domInject("#quantidade")
    private _inputQuantidade: JQuery;
    @domInject("#valor")
    private _inputValor: JQuery;
    private _negociacoes = new Negociacoes();
    private _negociacoesView = new NegociacoesView('#negociacoesView', true);
    private _mensagemView = new MensagemView("#mensagemView", true);
    private _service = new NegociacaoService();

    constructor() {
        this._negociacoesView.update(this._negociacoes);
    }

    @throttle()
    adiciona() {
        let data = new Date(this._inputData.val().replace(/-/g, ','));

        if (!this.ehDiaUtil(data)) {
            this._mensagemView.update("Não é permitido criar uma negociação aos finais de semana");
            return;
        }

        const negociacao = new Negociacao(
            data,
            parseInt(this._inputQuantidade.val()),
            parseFloat(this._inputValor.val())
        );

        this._negociacoes.adiciona(negociacao);
        this._negociacoes.negociacoes().forEach(negociacao => {
            console.log(negociacao.data);  
            console.log(negociacao.valor);
            console.log(negociacao.quantidade);
        });

        this._negociacoesView.update(this._negociacoes);
        this._mensagemView.update("Negociação adicionada com sucesso!");
    }

    @throttle()
    importaDados() {

        this._service
            .obterNegociacoes((res => {
                if (res.ok) {
                    return res;
                } else {
                    throw new Error(res.statusText);
                }
            }))
            .then(negociacoes => {
                negociacoes.forEach(negociacao => 
                    this._negociacoes.adiciona(negociacao));            
                this._negociacoesView.update(this._negociacoes);
            });

    }

    private ehDiaUtil(data: Date) {
        return data.getDay() != DiaDaSemana.Sabado || data.getDay() != DiaDaSemana.Domingo;
    }

}

enum DiaDaSemana {
    Domingo,
    Segunda,
    Terca,
    Quarta,
    Quinta,
    Sexta,
    Sabado
}