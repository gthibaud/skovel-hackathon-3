import md5 from 'md5';

export const generateGravatarUrl = (email: string) => {
    return `https://www.gravatar.com/avatar/${md5(
        String(email).trim().toLocaleLowerCase() || '',
    )}?d=mp`;
};
