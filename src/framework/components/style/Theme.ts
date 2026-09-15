
export default interface Theme {
    colors: {
        primary: string;
        secondary: string;
        accent: string;
        success: string;
        error: string;
        warning: string;
        info: string;
        background: string;
        surface: string;
        text: string;
        textSecondary: string;
    };
    spacing: {
        xs: string;
        sm: string;
        md: string;
        lg: string;
        xl: string;
    };
    typography: {
        fontSize: {
          xs: string;
          sm: string;
          base: string;
          lg: string;
          xl: string;
        };
        fontWeight: {
          regular: string;
          medium: string;
          bold: string;
        };
    };
    borderRadius: {
        none: string;
        sm: string;
        md: string;
        lg: string;
        full: string;
    };
}