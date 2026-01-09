import {
	IAuthenticateGeneric,
	ICredentialType,
	INodeProperties,
	ICredentialDataDecryptedObject,
	INodeCredentialTestResult,
	ICredentialTestFunctions,
} from 'n8n-workflow';

export class AdyntelApi implements ICredentialType {
	name = 'adyntelApi';
	displayName = 'Adyntel API';
	// eslint-disable-next-line n8n-nodes-base/cred-class-field-documentation-url-miscased
	documentationUrl = 'https://docs.adyntel.com';
	properties: INodeProperties[] = [
		{
			displayName: 'API Key',
			name: 'apiKey',
			type: 'string',
			typeOptions: { password: true },
			default: '',
		},
		{
			displayName: 'Email',
			name: 'email',
			type: 'string',
			placeholder: 'name@email.com',
			default: '',
		},
	];
	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			body: {
				'api_key': '={{$credentials.apiKey}}',
				'email': '={{$credentials.email}}'
			}
		},
	};
	// @ts-expect-error - n8n supports async test methods even though TypeScript interface may not reflect it
	async test(
		this: ICredentialTestFunctions,
		credentials: ICredentialDataDecryptedObject,
	): Promise<INodeCredentialTestResult> {
		const options = {
			method: 'POST',
			url: 'https://api.adyntel.com/test',
			body: {
				api_key: credentials.apiKey as string,
				email: credentials.email as string,
			},
			headers: {
				'Content-Type': 'application/json',
			},
		};

		try {
			await this.helpers.request(options);
			return {
				status: 'OK',
				message: 'Authentication successful!',
			};
		} catch (error) {
			return {
				status: 'Error',
				message: error instanceof Error ? error.message : 'Authentication failed',
			};
		}
	}
}
