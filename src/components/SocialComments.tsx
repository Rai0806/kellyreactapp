import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Heart, MessageCircle } from "lucide-react";

const comments = [
  {
    id: 1,
    name: "Sallie Hull",
    comment: "Shit I didn't win anything!",
    likes: 29,
    time: "4 minutes ago",
    avatar: "SH"
  },
  {
    id: 2,
    name: "Natalie Jennings",
    comment: "I like these promotions!",
    likes: 9,
    time: "11 minutes ago",
    avatar: "NJ"
  },
  {
    id: 3,
    name: "Casey Daniels",
    comment: "Love how light it feels but still delivers powerful performance in the kitchen! 🙄",
    likes: 22,
    time: "15 minutes ago",
    avatar: "CD"
  },
  {
    id: 4,
    name: "Emma Caldwell",
    comment: "I thought it was a joke, but my Le Creuset Cookware set arrived this morning!",
    likes: 36,
    time: "38 minutes ago",
    avatar: "EC"
  },
  {
    id: 5,
    name: "Florence Cleek",
    comment: "Delivers flawless results every time, pure kitchen magic!",
    likes: 31,
    time: "42 minutes ago",
    avatar: "FC"
  },
  {
    id: 6,
    name: "Amalia Falchi",
    comment: "Shhhh don't tell them that I'm using two different cards to get a Le Creuset's products for me and another to sell on FB marketplace lol. I think I've cracked the system",
    likes: 6,
    time: "1 hour ago",
    avatar: "AF"
  },
  {
    id: 7,
    name: "Margaret McNutt",
    comment: "It's my secret weapon for making every meal feel special!",
    likes: 15,
    time: "2 hours ago",
    avatar: "MM"
  },
  {
    id: 8,
    name: "Hannah Mason",
    comment: "Are there any other surveys to take?",
    likes: 39,
    time: "2 hours ago",
    avatar: "HM"
  },
  {
    id: 9,
    name: "Zoey Chandler",
    comment: "Fantastic! I have never won anything before!",
    likes: 23,
    time: "3 hours ago",
    avatar: "ZC"
  },
  {
    id: 10,
    name: "Tina Williams",
    comment: "I noticed a difference in my cooking from the very first use!",
    likes: 30,
    time: "4 hours ago",
    avatar: "TW"
  }
];

const SocialComments = () => {
  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">What People Are Saying</h2>
          
          <div className="space-y-4">
            {comments.map((comment) => (
              <div key={comment.id} className="bg-card rounded-lg p-4 shadow-card animate-fade-in">
                <div className="flex items-start space-x-3">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback className="bg-primary text-primary-foreground text-sm font-medium">
                      {comment.avatar}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h4 className="font-semibold text-sm">{comment.name}</h4>
                    </div>
                    
                    <p className="text-sm text-foreground mb-3">{comment.comment}</p>
                    
                    <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                      <button className="flex items-center space-x-1 hover:text-primary transition-colors">
                        <Heart className="h-3 w-3" />
                        <span>I like it</span>
                      </button>
                      <span>·</span>
                      <button className="flex items-center space-x-1 hover:text-primary transition-colors">
                        <MessageCircle className="h-3 w-3" />
                        <span>Comment</span>
                      </button>
                      <span>·</span>
                      <span className="flex items-center space-x-1">
                        <Heart className="h-3 w-3 fill-current text-red-500" />
                        <span>{comment.likes}</span>
                      </span>
                      <span>·</span>
                      <span>{comment.time}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SocialComments;