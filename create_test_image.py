#!/usr/bin/env python3
from PIL import Image, ImageDraw, ImageFont
import os

# Create a test receipt image
def create_test_receipt():
    # Create a white image
    img = Image.new('RGB', (400, 600), color='white')
    draw = ImageDraw.Draw(img)
    
    # Try to use a font, fall back to default if not available
    try:
        font = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf", 20)
        small_font = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf", 16)
    except:
        font = ImageFont.load_default()
        small_font = ImageFont.load_default()
    
    # Draw receipt content
    draw.text((20, 20), "TESTLADEN GMBH", fill='black', font=font)
    draw.text((20, 50), "Musterstraße 123", fill='black', font=small_font)
    draw.text((20, 70), "12345 Musterstadt", fill='black', font=small_font)
    draw.text((20, 90), "Tel: 0123-456789", fill='black', font=small_font)
    
    draw.line([(20, 110), (380, 110)], fill='black', width=2)
    
    draw.text((20, 130), "KASSENBON", fill='black', font=font)
    draw.text((20, 160), "Datum: 06.07.2025", fill='black', font=small_font)
    draw.text((20, 180), "Zeit: 14:30", fill='black', font=small_font)
    
    draw.line([(20, 200), (380, 200)], fill='black', width=1)
    
    draw.text((20, 220), "Büromaterial", fill='black', font=small_font)
    draw.text((300, 220), "45,67 EUR", fill='black', font=small_font)
    
    draw.text((20, 240), "Ordner A4", fill='black', font=small_font)
    draw.text((300, 240), "12,99 EUR", fill='black', font=small_font)
    
    draw.text((20, 260), "Stifte Set", fill='black', font=small_font)
    draw.text((300, 260), "8,50 EUR", fill='black', font=small_font)
    
    draw.line([(20, 280), (380, 280)], fill='black', width=1)
    
    draw.text((20, 300), "SUMME:", fill='black', font=font)
    draw.text((280, 300), "67,16 EUR", fill='black', font=font)
    
    draw.text((20, 330), "19% MwSt:", fill='black', font=small_font)
    draw.text((300, 330), "10,74 EUR", fill='black', font=small_font)
    
    draw.line([(20, 350), (380, 350)], fill='black', width=2)
    
    draw.text((20, 370), "Bar bezahlt:", fill='black', font=small_font)
    draw.text((280, 370), "70,00 EUR", fill='black', font=small_font)
    
    draw.text((20, 390), "Rückgeld:", fill='black', font=small_font)
    draw.text((300, 390), "2,84 EUR", fill='black', font=small_font)
    
    draw.text((20, 450), "Vielen Dank für Ihren Einkauf!", fill='black', font=small_font)
    draw.text((20, 480), "Beleg-Nr: 2025-001234", fill='black', font=small_font)
    
    # Save the image
    img.save('/home/brother/buchhaltung-app/test_receipt.png')
    print("Test receipt image created: test_receipt.png")

if __name__ == "__main__":
    create_test_receipt()