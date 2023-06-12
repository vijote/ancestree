const Dimensions = {
    Member: {
        spacing: 5,
        iconSize: 20,
        calculateIconSize: (options: { iconSize: number, zoomValue: number }) => `${Math.round(options.iconSize * (options.zoomValue / 100))}%`
    },
    Generation: {
        calculateY: (options: { generationIndex: number, iconSize: number, margin: number }) => `${(options.generationIndex * options.iconSize) + options.margin}%`,
        marginBottom: 3
    }
};

export default Dimensions;