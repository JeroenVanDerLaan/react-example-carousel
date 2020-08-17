class UniqueKey
{
    public generate(length: number = 16): string
    {
        length = Math.abs(length);
        let string: string = '';
        while (string.length < length) {
            string += Math.random().toString(36).substring(2, 15);
        }
        return string.substr(0, length);
    }
}

export default new UniqueKey();