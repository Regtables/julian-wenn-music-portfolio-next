import React from "react";
import BrandIcon from "./BrandIcon";
import FacebookIcon from "./FacebookIcon";
import InstagramIcon from "./InstagramIcon";
import YouTubeIcon from "./YoutubeIcon";
import YouTubeMusicIcon from "./YoutubeMusicIcon";
import SpotifyIcon from "./SpotifyIcon";
import AppleMusicIcon from "./AppleMusicIcon";

type Props = {
  iconSize?: number;
  color?: string;
};

const SocialIconStrip = ({ iconSize = 48, color = "gold" }: Props) => {
  return (
    <div className="flex gap-8">
      <FacebookIcon size={iconSize} color={color} />
      <InstagramIcon size={iconSize} color={color} />
      <YouTubeIcon size={iconSize} color={color} />
      <YouTubeMusicIcon size={iconSize} color={color} />
      <SpotifyIcon size={iconSize} color={color} />
      <AppleMusicIcon size={iconSize} color={color} />
    </div>
  );
};

export default SocialIconStrip;
