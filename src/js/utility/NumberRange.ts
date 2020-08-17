class NumberRange
{
    public clamp(min: number, max: number, value: number): number
    {
        return Math.min(Math.max(value, min), max);
    }
}

export default new NumberRange();