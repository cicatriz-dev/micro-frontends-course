export type AulaMode = 'aula2' | 'aula3' | 'aula4';

export interface MFEConfig {
	mode: AulaMode;
	usesModuleFederation: boolean;
	usesSingleSpa: boolean;
	remoteName?: string;
	importPath?: string;
}

export function getMFEConfig(): MFEConfig {
	const mode = (import.meta.env.VITE_AULA_MODE || 'aula4') as AulaMode;

	switch (mode) {
		case 'aula2':
			return {
				mode: 'aula2',
				usesModuleFederation: false,
				usesSingleSpa: true,
			};
		case 'aula3':
			return {
				mode: 'aula3',
				usesModuleFederation: true,
				usesSingleSpa: false,
				remoteName: 'mfeLogin',
				importPath: 'mfeLogin/LoginApp',
			};
		case 'aula4':
			return {
				mode: 'aula4',
				usesModuleFederation: true,
				usesSingleSpa: false,
				remoteName: 'mfeLoginNative',
				importPath: 'mfeLoginNative/LoginApp',
			};
		default:
			throw new Error(`Invalid VITE_AULA_MODE: ${mode}`);
	}
}
