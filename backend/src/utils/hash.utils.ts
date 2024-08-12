import * as bcrypt from 'bcrypt';

const saltRounds = 10;

export const encrypt = async (password: string): Promise<string> => {
	return await bcrypt.hash(password, saltRounds);
};

export const compare = async (password: string, hashedPassword: string): Promise<boolean> => {
	return await bcrypt.compare(password, hashedPassword);
};
