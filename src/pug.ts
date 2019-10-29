import { renderFile, Options, LocalsObject } from 'pug';
import { join } from 'path';

type HtmlString = string;
export const TEMPLATE_BASE_FOLDER = join(__dirname, 'pages');

export function render(
  templatename: string,
  options?: Options & LocalsObject,
): HtmlString {
  if (!templatename.endsWith('.pug')) {
    templatename = `${templatename}.pug`;
  }

  const fullpath = join(TEMPLATE_BASE_FOLDER, templatename);
  return renderFile(fullpath, options);
}
