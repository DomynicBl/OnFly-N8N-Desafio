import { IExecuteFunctions } from 'n8n-workflow';
import {
	INodeType,
	INodeTypeDescription,
	INodeExecutionData,
	IHttpRequestMethods,
} from 'n8n-workflow';

export class Random implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Random',
		name: 'random',
		icon: 'file:icon.svg',
		group: ['transform'],
		version: 1,
		description: 'Conector que utiliza a API da Random.org para gerar um número aleatório verdadeiro.',
		defaults: {
			name: 'Random Number',
		},
		inputs: ['main'],
		outputs: ['main'],
		properties: [
			{
				displayName: 'Operação',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'True Random Number Generator',
						value: 'generate',
						description: 'Gera um número inteiro aleatório',
						action: 'Gera um número inteiro aleatório',
					},
				],
				default: 'generate',
			},
			{
				displayName: 'Min',
				name: 'min',
				type: 'number',
				default: 1,
				required: true,
				description: 'O valor mínimo para o número aleatório (inclusivo).',
			},
			{
				displayName: 'Max',
				name: 'max',
				type: 'number',
				default: 100,
				required: true,
				description: 'O valor máximo para o número aleatório (inclusivo).',
			},
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];

		for (let i = 0; i < items.length; i++) {
			const min = this.getNodeParameter('min', i, 1) as number;
			const max = this.getNodeParameter('max', i, 100) as number;

			const options = {
				method: 'GET' as IHttpRequestMethods,
				url: `https://www.random.org/integers/?num=1&min=${min}&max=${max}&col=1&base=10&format=plain&rnd=new`,
				json: false, // A API retorna texto puro
			};

			const response = await this.helpers.httpRequest(options);
            const randomNumber = parseInt(String(response).trim(), 10);

			returnData.push({
				json: {
					randomNumber: randomNumber,
				},
			});
		}

		return [this.helpers.returnJsonArray(returnData)];
	}
}