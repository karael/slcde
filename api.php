<?php

require_once('twitterAPIExchange.php');

/** Set access tokens here - see: https://dev.twitter.com/apps/ **/
$settings = array(
    'oauth_access_token' => "619446792-Xm7UGHY8YVb6vkhMzwWrD1nJrP68JMhBoYwMGcjE",
    'oauth_access_token_secret' => "V2UDMylsV9eT4qAIpPUXCTUEmJGiHZDWPW4FxIxXwLe29",
    'consumer_key' => "Mlt36AZmfbrFwOkAeus48tTKF",
    'consumer_secret' => "udxVLwhceZi8x8DiZp2uhhH86ex4GZAYZO5ba4bnT7GQkreahu"
);


$url = 'https://api.twitter.com/1.1/statuses/user_timeline.json';
$getfield = '?count=4';
$requestMethod = 'GET';

$twitter = new TwitterAPIExchange($settings);
echo $string = $twitter->setGetfield($getfield)
             ->buildOauth($url, $requestMethod)
             ->performRequest();  


?>