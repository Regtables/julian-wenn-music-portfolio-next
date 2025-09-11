import { type PropsWithClassName } from "@/types";
import { type SanityTextBlock as SanityTextBlockType } from "@/app/lib/sanity/types";
import { cn } from "@/app/lib/utils";

type SanityTextBlockProps = {
  text: SanityTextBlockType[];
  blockClassName?: string;
};

const SanityTextBlock = ({ text, className, blockClassName } : PropsWithClassName<SanityTextBlockProps>) => {
  return (
    <div className={className}>
      {text.map((block, blockIndex) => (
        <p className={cn("lg:mb-4 last:mb-0", blockClassName)} key={blockIndex}>
          {block.children?.map((child, childIndex) => (
            <span key={childIndex}>{child.text}</span>
          ))}
        </p>
      ))}
    </div>
  );
};

export default SanityTextBlock;