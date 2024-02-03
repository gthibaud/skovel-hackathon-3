import toast from 'react-hot-toast';

/**
 * Share content to default share API or copy to clipboard
 * @param url URL to share
 * @param text Content to share (will not be shared if only copy to clipboard)
 */
export const share = (url: string, text?: string) => {
    try {
        if (navigator.canShare && navigator.canShare()) {
            navigator.share({
                text,
                url,
            });
        } else {
            navigator.clipboard.writeText(url.toString() || '');
            toast.success(`'${url.toString()}' copied to clipboard!`);
        }
    } catch (error) {
        console.error(error);
        toast.error('Error sharing content!');
    }
};
