export class DefaultServices {
    prisma: any
    name: any

    constructor(options: {prisma: any, name: any}){
        this.prisma = options.prisma
        this.name = options.name
    }

    getAll() {
        return this.prisma[this.name].findMany()
    }

    create(dto) {
        return this.prisma[this.name].create({
            data: dto
        })
    }

    async delete(id) {
        const exist = await this.prisma[this.name].findFirst({ where: { id: id } })
        if (exist) {
            return this.prisma[this.name].delete({ where: { id: id } })
        } else {
            return `The ${this.name} with id ${id} does not exist`
        }
    }

    async findOne(id: number) {
        const item = await this.prisma[this.name].findFirst({ where: { id: id } })
        if(item){
            return this.prisma[this.name].findFirst({ where: { id: id } })
        }
        else{
            return [`${this.name} this id ${id} does not exist`,{
                statusCode: 400,
            }]
        }
    }

    update(id: number, updateTagDto) {
        return this.prisma[this.name].update({ data: updateTagDto, where: { id: id } })
    }

    async deleteAll(){
        return this.prisma[this.name].deleteMany() //! No into prod
    }

    async deleteByIdsArray(idsToDelete : number[]){
        return this.prisma[this.name].deleteMany({
            where: {
                id: {
                    in: idsToDelete
                }
            }
        })
    }
}

export function translit(word : string){
	var answer = '';
	var converter = {
		'а': 'a',    'б': 'b',    'в': 'v',    'г': 'g',    'д': 'd',
		'е': 'e',    'ё': 'e',    'ж': 'zh',   'з': 'z',    'и': 'i',
		'й': 'y',    'к': 'k',    'л': 'l',    'м': 'm',    'н': 'n',
		'о': 'o',    'п': 'p',    'р': 'r',    'с': 's',    'т': 't',
		'у': 'u',    'ф': 'f',    'х': 'h',    'ц': 'c',    'ч': 'ch',
		'ш': 'sh',   'щ': 'sch',  'ь': '',     'ы': 'y',    'ъ': '',
		'э': 'e',    'ю': 'yu',   'я': 'ya',
 
		'А': 'a',    'Б': 'b',    'В': 'v',    'Г': 'g',    'Д': 'd',
		'Е': 'e',    'Ё': 'e',    'Ж': 'zh',   'З': 'z',    'И': 'i',
		'Й': 'y',    'К': 'k',    'Л': 'l',    'М': 'm',    'Н': 'n',
		'О': 'o',    'П': 'p',    'Р': 'r',    'С': 's',    'Т': 't',
		'У': 'u',    'Ф': 'f',    'Х': 'h',    'Ц': 'c',    'Ч': 'ch',
		'Ш': 'sh',   'Щ': 'sch',  'Ь': '',     'Ы': 'y',    'Ъ': '',
		'Э': 'e',    'Ю': 'yu',   'Я': 'ya', ' ': '-', '?' : '', '»' : '', '«' : ''
	};
 
	for (var i = 0; i < word.length; ++i ) {
		if (converter[word[i]] == undefined){
			answer += word[i];
		} else {
			answer += converter[word[i]];
		}
	}
 
	return answer;
}