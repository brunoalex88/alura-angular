export function logarTempoDeExecucao(emSegundos?: boolean) {

    return function(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        const metodoOriginal = descriptor.value;
        
        descriptor.value = function(...args: any[]) {
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
    }

}