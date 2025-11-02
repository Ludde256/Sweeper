import { type Config, colors, animals, uniqueNamesGenerator } from "unique-names-generator";

const config: Config = {
	dictionaries: [colors, animals],
	style: "capital",
	separator: " ",
};

export function randomName(): string {
	return uniqueNamesGenerator(config);
}
