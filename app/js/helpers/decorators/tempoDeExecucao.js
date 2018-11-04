System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    function logarTempoDeExecucao(emSegundos) {
        return function (target, propertyKey, descriptor) {
            const metodoOriginal = descriptor.value;
            descriptor.value = function (...args) {
                let unidade = "ms";
                let divisor = 1;
                if (emSegundos) {
                    unidade = "s";
                    divisor = 1000;
                }
                console.log("---------------------------------");
                console.log(`Os parâmetros passados para o método ${propertyKey}: ${JSON.stringify(args)}.`);
                const tempo1 = performance.now();
                const retorno = metodoOriginal.apply(this, args);
                const tempo2 = performance.now();
                console.log(`O retorno do método ${propertyKey} é: ${JSON.stringify(args)}`);
                console.log(`O método ${propertyKey} durou: ${(tempo2 - tempo1) / divisor} ${unidade}`);
            };
            return descriptor;
        };
    }
    exports_1("logarTempoDeExecucao", logarTempoDeExecucao);
    return {
        setters: [],
        execute: function () {
        }
    };
});
