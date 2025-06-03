import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-chatbot',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.scss']
})
export class ChatbotComponent {
  messages: { role: string, content: string }[] = [];
  userMessage: string = '';
  chatbotActive: boolean = false;
  isLoading: boolean = false;

  constructor(private http: HttpClient) {}

  toggleChatbot() {
    this.chatbotActive = !this.chatbotActive;
  }

  sendMessage() {
    const userMsg = this.userMessage.trim();
    if (!userMsg) return;

    // Add user message
    this.messages.push({ role: 'user', content: userMsg });
    this.isLoading = true;
    
    // Add temporary assistant message
    const thinkingIndex = this.messages.length;
    this.messages.push({ role: 'assistant', content: "..." });

    // Scroll to bottom
    this.scrollToBottom();

    this.http.post<any>('http://localhost:8000/ask', {
      query: userMsg,
      history: this.messages
    }).subscribe({
      next: (res) => {
        this.messages[thinkingIndex] = { 
          role: 'assistant', 
          content: res.response || "I couldn't understand that."
        };
        this.isLoading = false;
        this.scrollToBottom();
      },
      error: (err) => {
        this.messages[thinkingIndex] = { 
          role: 'assistant', 
          content: "Sorry, I encountered an error."
        };
        this.isLoading = false;
        console.error(err);
        this.scrollToBottom();
      }
    });

    this.userMessage = '';
  }

  private scrollToBottom() {
    setTimeout(() => {
      const messagesContainer = document.querySelector('.chatbot-messages');
      if (messagesContainer) {
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
      }
    }, 100);
  }
}