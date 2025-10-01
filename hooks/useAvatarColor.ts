export const useAvatarColor = () => {
    const getColorByLetter = (letter: string): string => {
        const colors = [
            "#FF6B6B",
            "#4ECDC4",
            "#45B7D1",
            "#96CEB4",
            "#FFEAA7",
            "#DDA0DD",
            "#98D8C8",
            "#F7DC6F",
            "#BB8FCE",
            "#85C1E9",
            "#F8C471",
            "#82E0AA",
        ];

        // Crear hash simple de la letra
        let hash = 0;
        for (let i = 0; i < letter.length; i++) {
            const char = letter.charCodeAt(i);
            hash = (hash << 5) - hash + char;
            hash = hash & hash; // Convert to 32bit integer
        }

        const index = Math.abs(hash) % colors.length;
        return colors[index];
    };

    return { getColorByLetter };
};
