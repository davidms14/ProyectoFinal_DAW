import i18n, { getLanguagesList } from './i18n';

describe('src/i18n tests', () => {
    it('should return traductions list', () => {
        // Arrange

        // Act
        const list = getLanguagesList();

        // Assert
        expect(list).not.toBe(null);
    });
});
