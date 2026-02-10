import { INodeType, INodeTypeDescription } from 'n8n-workflow';

export class Adyntel implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Adyntel API',
		name: 'adyntel',
		icon: 'file:adyntel.svg',
		group: ['transform'],
		version: 1,
		usableAsTool: true,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Learn if a domain is running ads or not using the Adyntel API',
		defaults: {
			name: 'Adyntel API',
		},
		inputs: ['main'],
		outputs: ['main'],
		credentials: [
			{
				name: 'adyntelApi',
				required: true,
			},
		],
		requestDefaults: {
			baseURL: 'https://api.adyntel.com',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		},
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Facebook Ad',
						value: 'facebookAds',
					},
					{
						name: 'Google Ad',
						value: 'googleAds',
					},
					{
						name: 'LinkedIn Ad',
						value: 'linkedInAds',
					},
				],
				default: 'facebookAds',
			},
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['facebookAds'],
					},
				},
				options: [
					{
						name: 'Search',
						value: 'search',
						action: 'Search facebook ads',
						description: 'Search Facebook ads for a company domain',
						routing: {
							request: {
								method: 'POST',
								url: '/facebook',
								body: {
									company_domain: '={{$parameter.companyDomain}}',
								},
							},
						},
					},
				],
				default: 'search',
			},
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['googleAds'],
					},
				},
				options: [
					{
						name: 'Search',
						value: 'search',
						action: 'Search google ads',
						description: 'Search Google ads for a company domain',
						routing: {
							request: {
								method: 'POST',
								url: '/google',
								body: {
									company_domain: '={{$parameter.companyDomain}}',
								},
							},
						},
					},
				],
				default: 'search',
			},
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['linkedInAds'],
					},
				},
				options: [
					{
						name: 'Search',
						value: 'search',
						action: 'Search linked in ads',
						description: 'Search LinkedIn ads for a company domain',
						routing: {
							request: {
								method: 'POST',
								url: '/linkedin',
								body: {
									company_domain: '={{$parameter.companyDomain}}',
								},
							},
						},
					},
				],
				default: 'search',
			},
			{
				displayName: 'Company Domain',
				name: 'companyDomain',
				type: 'string',
				required: true,
				default: '',
				description: 'The company domain to get ads data for (e.g., example.com)',
			},
		],
	};
}
